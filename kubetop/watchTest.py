from kubernetes import client, config, watch

config.load_kube_config()

v1 = client.CoreV1Api()
count = 10
w = watch.Watch()
for event in w.stream(v1.list_namespace, timeout_seconds=10):
    print("Event: %s %s" % (event['type'], event['object'].metadata.name))
    count -= 1
    if not count:
        w.stop()
print("Finished namespace stream.")

for event in w.stream(v1.list_pod_for_all_namespaces, timeout_seconds=10):
    print("Event: %s %s %s" % (
        event['type'],
        event['object'].kind,
        event['object'].metadata.name)
    )
    count -= 1
    if not count:
        w.stop()
print("Finished pod stream.")