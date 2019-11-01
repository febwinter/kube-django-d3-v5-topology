from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.template import loader
import json
#from django.utils import simplejson
#from dashboard.models import KubeFile
from kubernetes import client, config
from django.core import serializers
from .models import KubeData
from .consumers import MQTTConsumer

# Create your views here.

def index(request):
    kube = KubeData()
    kube.makeJson()
    contextJ = {"Jdata":kube.kubeJson}

    return render(request, 'dashboard/index.html',context=contextJ)

# def sendMQTT(request):
#     mq = MQTTConsumer()
#     print(mq.receiveMessage())
