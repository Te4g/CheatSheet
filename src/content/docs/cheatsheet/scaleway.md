---
title: Scaleway
---

## Create a small server with a docker image with no ipv4 (cheaper)
```shell script
scw instance server create image=docker type=DEV1-S ip=ipv6 ipv6=true dynamic-ip-required=false root-volume=local:10GB name=test --wait
```
