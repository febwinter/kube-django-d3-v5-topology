from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.template import loader
import json
#from django.utils import simplejson
#from dashboard.models import KubeFile
from kubernetes import client, config
from django.core import serializers
from .models import KubeData


# Create your views here.

def index(request):
    config.load_kube_config()
    idNum = 1
    masterId = 0
    tempNode = {}
    nodeList = []
    linkList = []
    v1 = client.CoreV1Api()

    pods = v1.list_pod_for_all_namespaces(watch=False)
    nodes = v1.list_node(watch=False)

    # master Node group : 0
    # worker Node group : 1
    # pod group : 2

    for i in nodes.items:
        if (i.metadata.labels["nodetype"] == "master"):
            nodeList.append({"id":0,"name":i.metadata.name,"group":0,"size":40})
            tempNode[i.metadata.name] = 0
            masterId = 0
        else:
            nodeList.append({"id":idNum,"name":i.metadata.name,"group":1,"size":30})
            linkList.append({"source":0,"target":idNum})
            tempNode[i.metadata.name] = idNum
            idNum+=1

    # for i in range(idNum):
    #     if (i != masterId):
    #         linkList.append({"source":masterId,"target":i})

    for i in pods.items:
        nodeList.append({"id":idNum,"name":i.metadata.name,"group":2,"size":10})
        if tempNode[i.spec.node_name] == None:
            linkList.append({"source":idNum,"target":None})
        else:    
            linkList.append({"source":idNum,"target":tempNode[i.spec.node_name]})
        idNum+=1

    jsonData = dict()

    jsonData["nodes"] = nodeList
    jsonData["links"] = linkList

    KubeData.kubeJson = jsonData

    # jsonSum = json.dumps(jsonData, ensure_ascii=False, indent="\t")
    contextJ = {"Jdata":jsonData}

    return render(request, 'dashboard/index.html',context=contextJ)
