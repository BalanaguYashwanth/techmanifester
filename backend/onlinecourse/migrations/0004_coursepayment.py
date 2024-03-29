# Generated by Django 3.1.1 on 2021-02-05 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('onlinecourse', '0003_auto_20210118_1111'),
    ]

    operations = [
        migrations.CreateModel(
            name='coursepayment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=255)),
                ('phone', models.TextField()),
                ('productinfo', models.TextField()),
                ('amount', models.TextField()),
                ('addedon', models.TextField()),
                ('hash_verified', models.TextField()),
                ('status', models.TextField()),
                ('txnid', models.TextField()),
                ('payuMoneyId', models.TextField()),
                ('encryptedPaymentId', models.TextField()),
                ('cardnum', models.TextField()),
                ('bank_ref_num', models.TextField()),
            ],
        ),
    ]
