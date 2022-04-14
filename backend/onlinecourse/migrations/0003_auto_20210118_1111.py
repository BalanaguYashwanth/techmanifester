# Generated by Django 3.1.1 on 2021-01-18 11:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('onlinecourse', '0002_auto_20210118_1006'),
    ]

    operations = [
        migrations.CreateModel(
            name='overview',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('data', models.TextField()),
            ],
        ),
        migrations.AlterField(
            model_name='courses',
            name='imgurl',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='courses',
            name='title',
            field=models.CharField(max_length=150),
        ),
    ]
