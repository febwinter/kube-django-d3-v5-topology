from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import json
from dashBoard.models import KubeFile

# Create your views here.

def index(request):
    return render(request, 'dashboard/index.html')

# def infoSend(request):
#     return render(request, KubeFile.jsonfile)

kubeData = KubeFile.jsonfile


