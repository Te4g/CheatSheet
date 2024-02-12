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
