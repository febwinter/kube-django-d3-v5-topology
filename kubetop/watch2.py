from kubernetes import client, config, watch
import json
from pprint import pprint

config.load_kube_config()
v1 = client.CoreV1Api()

w = watch.Watch()

for event in w.stream(v1.list_pod_for_all_namespaces):
        print("Event: %s %s %s" % (
        event['type'],
        event['object'].kind,
        event['object'].metadata.name)
    )
