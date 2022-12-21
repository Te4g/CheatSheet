### Build an image
```
# Build the image for multiple architectures
docker image build --platform linux/amd64 --platform linux/arm64/v8 --platform linux/arm/v7 -t myregistry/myimage:latest .
```

### Push an image to DockerHub
```
docker image push myregistry/myimage:latest
```
