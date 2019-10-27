
from kubernetes import client, config, watch
import json
from pprint import pprint


config.load_kube_config()

v1 = client.CoreV1Api()
count = 20
w = watch.Watch()
# for event in w.stream(v1.list_namespace, timeout_seconds=10):
#     print("Event: %s %s" % (event['type'], event['object'].metadata.name))
#     count -= 1
#     if not count:
#         w.stop()
# print("Finished namespace stream.")

for event in w.stream(v1.list_pod_for_all_namespaces):
    # print("Event: %s %s %s" % (
    #     event['type'],
    #     event['object'].kind,
    #     event['object'].metadata.name)
    # )
    if count == 20:
        Object = event['raw_object']
    count -= 1
    if not count:
        w.stop()
objectJson = json.dumps(Object)
pprint(objectJson)

print("Finished pod stream.")

#print(w.stream(v1.list_namespace,timeout_seconds=10)['object'])
# watchJson = json.dumps(watchObj)