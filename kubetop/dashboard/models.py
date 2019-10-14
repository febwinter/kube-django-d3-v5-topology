from django.db import models

# Create your models here.

class Master(models.Model):
    master_name = models.CharField(max_length=200)
    

class Worker(models.Model):
    worker_name = models.CharField(max_length=200)
    worker_ip = models.GenericIPAddressField()

class Pod(models.Model):
    pod_name = models.CharField(max_length=200)
    pod_namespace = models.CharField(max_length=200)
    pod_ip = models.GenericIPAddressField()

class Container(models.Model):
    cont_name = models.CharField(max_length=200)