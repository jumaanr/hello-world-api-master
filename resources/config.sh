#!/bin/bash
minikube addons enable ingress


openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout tls.key -out tls.crt \
  -subj "/CN=helloworldapimaster.com/O=helloworldapimaster.com"

kubectl create secret tls hello-world-api-tls --key tls.key --cert tls.crt

