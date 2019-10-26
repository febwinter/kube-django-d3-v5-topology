from kubernetes import client, config, watch
import json
from pprint import pprint

config.load_kube_config

