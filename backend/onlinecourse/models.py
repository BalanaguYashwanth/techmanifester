from django.db import models
from jsonfield import JSONField
import collections

# Create your models here.

class courses(models.Model):
    title = models.CharField(max_length=150)
    imgurl=models.TextField()


class overview(models.Model):
    title=models.TextField()
    data=models.TextField()

class coursepayment(models.Model):
    firstname=models.CharField(max_length=100)
    email=models.EmailField(max_length=255)
    phone=models.TextField()
    productinfo=models.TextField()
    amount=models.TextField()
    addedon=models.TextField()
    hash_verified=models.TextField()
    status=models.TextField()
    txnid=models.TextField()
    payuMoneyId=models.TextField()
    encryptedPaymentId=models.TextField()
    bank_ref_num=models.TextField()