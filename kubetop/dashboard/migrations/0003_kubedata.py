# Generated by Django 2.2.6 on 2019-10-25 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('dashboard', '0002_auto_20191023_1448'),
    ]

    operations = [
        migrations.CreateModel(
            name='KubeData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
    ]
