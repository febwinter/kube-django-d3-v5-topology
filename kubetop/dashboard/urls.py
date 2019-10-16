from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('', views.sendData, name='v5_graph.js'),
]
