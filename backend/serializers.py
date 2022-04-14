from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User,auth
from django.contrib.auth import authenticate
from rest_framework import exceptions

class coursesSerializer(serializers.ModelSerializer):
    class Meta:
        model=courses
        fields='__all__'

class overviewSerializer(serializers.ModelSerializer):
    data=serializers.JSONField()
    class Meta:
        model=overview
        fields='__all__'


class coursepaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model=coursepayment
        fields='__all__'

class registerSerializer(serializers.ModelSerializer):
    username=serializers.CharField(max_length=150)
    password=serializers.CharField(max_length=150)
    email=serializers.EmailField(min_length=4,max_length=255)
    first_name=serializers.CharField(max_length=150)
    last_name=serializers.CharField(max_length=150)

    class Meta:
        model=User
        fields='__all__'

    def save(self):
        username=self.validated_data['username']
        email=self.validated_data['email']
        password=self.validated_data['password']
        if User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists():
            raise serializers.ValidationError({'account':'account is already exists'})
        if not(username and password):
            raise serializers.ValidationError({'account':'please fill all input boxes'})
        else:
            user=User.objects.create(
                username=self.validated_data['username'],
                email=self.validated_data['email'],
                first_name=self.validated_data['first_name'],
                last_name=self.validated_data['last_name']
            )
            password=self.validated_data['password']
            user.is_active=True
            user.set_password(password)
            user.save()
            return user

class loginSerializer(serializers.ModelSerializer):
    username=serializers.CharField(max_length=150)
    password=serializers.CharField(max_length=150)

    class Meta:
        model=User
        fields='__all__'

    def save(self):
        username=self.validated_data['username']
        password=self.validated_data['password']
        if username and password:
            user=authenticate(username=username,password=password)
            if user:
                if user.is_active:
                    return user
                else:
                    raise serializers.ValidationError({'account':'account is not active'})
            else:
                return user
                
        else:
            raise serializers.ValidationError({'account':'username and password not to be blank'})

        