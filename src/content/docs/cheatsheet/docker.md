---
title: Docker
---

### Build an image
```
# Build the image for multiple architectures
docker buildx build --platform linux/amd64,linux/arm64,linux/armv7 -t myregistry/myimage:latest .
```

### Push an image to DockerHub
```
docker buildx push --platform linux/amd64,linux/arm64,linux/armv7 myregistry/myimage:latest
```

### Run composer from docker
```
docker run --rm -v $(pwd):/app composer
```

### Quick start a ubuntu container
```bash
docker run --rm -it ubuntu /bin/bash
```

## Network
### Create a network
```bash
sudo docker network create my_docker_network --subnet 172.46.0.0/20
```
### Run a container on the freshly created network with a custom IP
```bash
docker run --rm --net my_docker_network --ip 172.46.0.1 -p 8080:80 nginx
```
### When using UFW, allow the traffic to the previously created container
```bash
sudo ufw route allow proto tcp from any to 172.46.0.1 port 80
```
## Check if it works
```bash
curl http://{public_ip}:8080 ## Should return the nginx welcome page
```
### Remove dangling volumes
```bash
docker volume rm `docker volume ls -q -f dangling=true`
```
