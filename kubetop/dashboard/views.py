from django.shortcuts import render
from django.http import JsonResponse
from django.template import loader
import json
from dashboard.models import KubeFile

# Create your views here.

def index(request):
    return render(request, 'dashboard/index.html')

# def infoSend(request):
#     return render(request, KubeFile.jsonfile)

#kubeData = KubeFile.jsonfile

def sendData(request):
    return JsonResponse(KubeFile.jsonfile)

