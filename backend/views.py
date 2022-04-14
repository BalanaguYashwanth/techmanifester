from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from rest_framework import viewsets,status
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User,auth,Group
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAuthenticatedOrReadOnly
from django.contrib.auth import logout
from django.contrib import admin
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import requests
# Import Payu from Paywix
from paywix.payu import Payu
from django import template
from django.core import serializers
import uuid

payu_config = settings.PAYU_CONFIG
merchant_key = payu_config.get('merchant_key')
merchant_salt = payu_config.get('merchant_salt')
surl = payu_config.get('success_url')
furl = payu_config.get('failure_url')
mode = payu_config.get('mode')

# Create Payu Object for making transaction
payu = Payu(merchant_key, merchant_salt, surl, furl, mode)


class paymentView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    
    def post(self,request):
        paymentdata=request.data
        data = {
            'amount': '1000', 
            'firstname': paymentdata['firstname'], 
            'email': paymentdata['email'],
            'phone': paymentdata['phone'], 'productinfo': paymentdata['course'], 
            'lastname': paymentdata['lastname'], 'address1': 'test', 
            'address2': paymentdata['udf1'], 'city': 'test', 
            'state': 'test', 'country': 'test', 
            'zipcode': 'test', 'udf1': '', 
            'udf2': '', 'udf3': '', 'udf4': '', 'udf5': ''
        }
        txnid = uuid.uuid4()
        data.update({"txnid": txnid})
        payu_data = payu.transaction(**data)
        #return render(request, 'payu_checkout.html', {"posted": payu_data})
        return Response(payu_data)


class success(APIView):

    # def get(self,request,data):
    #     pass

    @csrf_exempt
    def post(self,request):
        data = {k: v[0] for k, v in dict(request.POST).items()}
        response = payu.verify_transaction(data)

        data={
            'firstname':response['return_data']['firstname'],
            'email':response['return_data']['email'],
            'phone':response['return_data']['phone'],
            'productinfo':response['return_data']['productinfo'],
            'amount':response['return_data']['amount'],
            'addedon':response['return_data']['addedon'],
            'hash_verified':response['hash_verified'],
            'status':response['return_data']['status'],
            'txnid':response['return_data']['txnid'],
            'payuMoneyId':response['return_data']['payuMoneyId'],
           'encryptedPaymentId':response['return_data']['encryptedPaymentId'],
            #'cardnum':response['return_data']['cardnum'],
            'bank_ref_num':response['return_data']['bank_ref_num'],
            'dummy':response['return_data']['address2'],
        }
        
        headers = {
            'Authorization': "Bearer " +data['dummy']
        }
        print(data['dummy'])
        res=requests.post('https://online-new-courses.herokuapp.com/api/coursepayments/', data=data,headers=headers)
        print(res)
        return HttpResponse('successfully payment done --> <a href="https://techmanifester.com/">Home</a>')


class failure(APIView):

    @csrf_exempt
    def post(self,request):
        data = {k: v[0] for k, v in dict(request.POST).items()}
        response = payu.verify_transaction(data)
        return HttpResponse('payment failed, please try again after some time <a href="https://techmanifester.com/">Home</a>')
        


class userdetails(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self,request):
        model=User.objects.filter(id=request.user.id)
        serializer=registerSerializer(model,many=True)
        #print(serializer.data)
        return Response(serializer.data)

class usergroups(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self,request):
        model=User.objects.filter(id=request.user.id)
        serializer=registerSerializer(model,many=True)
        if request.user.groups.filter(name='admin'):
            admin=True
        else:
            admin=False
        return Response({'user':serializer.data,'admin':admin})


# Create your views here.
def home(request):
    return render(request,'payu_checkout.html')


class coursepaymentView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,) #required

    queryset=coursepayment.objects.all()
    serializer_class=coursepaymentSerializer


class coursesView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)

    queryset=courses.objects.all()
    serializer_class= coursesSerializer

class overviewView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)  #required

    queryset=overview.objects.all()
    serializer_class=overviewSerializer


class registerView(APIView):

    def post(self,request):
        serializers=registerSerializer(data=request.data)
        data={}
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            data['feedback']='successfully registered'
            return Response(data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)


class adminregisterView(APIView):

    def post(self,request):
        serializers=registerSerializer(data=request.data)
        data={}
        if serializers.is_valid(raise_exception=True):
            rdata = serializers.save()
            group=Group.objects.get(name='admin')
            rdata.groups.add(group)
            data['email']=rdata.email
            data['username']=rdata.username
            data['response']="successfully registered as a admin"
            return Response(data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)


class loginView(APIView):

    def post(self,request):
        serializers=loginSerializer(data=request.data)
        #usergroup={}
        if serializers.is_valid(raise_exception=True):
            user=serializers.save()
            auth.login(request,user)
            token,created=Token.objects.get_or_create(user=user)
            if user.groups.filter(name='admin'):
                admin=True
            else:
                admin=False
            return Response({'token':token.key,'admin':admin},status=200)
        else:
            return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)


class logoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self,request):
        logout(request)
        data=request.data
        #request.user.auth_token.delete()
        return Response("successfully logout")


