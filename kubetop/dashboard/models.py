from django.db import models
import json
from collections import OrderedDict


# Create your models here.
class KubeData(models.Model):
    kubeJson = dict()