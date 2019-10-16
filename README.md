# README.md

#You must set kubernets node label

key : "nodetype"

Master nodes should be --> nodetype : master

Other nodes can get free name --> nodetype : "name or something"

## Dependency

kubernetes python client api (Recommand manual Setting)

## Setting

apt-get install python3-pip

pip3 setuptools upgrade

pip3 install django (2.0+)

## Starting

In kubetop directory


- python3 manage.py runserver 0.0.0.0:8000

