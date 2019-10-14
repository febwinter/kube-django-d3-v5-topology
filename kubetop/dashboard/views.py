from django.shortcuts import render

from django.http import HttpResponse
from django.template import loader
import json

# Create your views here.

def index(request):
    return render(request, 'dashboard/index.html')



