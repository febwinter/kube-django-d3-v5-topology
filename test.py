import json
from collections import OrderedDict
from kubernetes import client, config

config.load_kube_config()
idNum = 0
masterId = 0
tempNode = {}
nodeList = []
linkList = []
v1 = client.CoreV1Api()
print("Listing pods with their IPs:")

pods = v1.list_pod_for_all_namespaces(watch=False)
nodes = v1.list_node(watch=False)

for i in pods.items:
    print("%s\t%s\t%s\t%s" % (i.spec.node_name, i.status.pod_ip, 
    i.metadata.namespace, i.metadata.name))

print("\n")

for i in nodes.items:
    print("%s\t%s" % (i.metadata.name, i.metadata.labels['nodetype']))

# master Node group : 0
# worker Node group : 1
# pod group : 2

for i in nodes.items:
    if (i.metadata.labels["nodetype"] == "master"):
        nodeList.append({"id":idNum,"name":i.metadata.name,"group":0})
        tempNode[i.metadata.name] = idNum
        masterId = idNum
        idNum+=1
    else:
        nodeList.append({"id":idNum,"name":i.metadata.name,"group":1})
        tempNode[i.metadata.name] = idNum
        idNum+=1

for i in range(idNum):
    if (i != masterId):
        linkList.append({"source":masterId,"target":i})

for i in pods.items:
    nodeList.append({"id":idNum,"name":i.metadata.name,"group":2})
    linkList.append({"source":idNum,"target":tempNode[i.spec.node_name]})
    idNum+=1

jsonData = dict()

jsonData["nodes"] = nodeList
jsonData["links"] = linkList

jsonfile = json.dumps(jsonData, ensure_ascii=False, indent="\t")

print(jsonfile)
