### Build an image
```
# simple build
docker image build --tag your-username/multiarch-example:1.0 .

# Multi platform build
docker image build --platform linux/arm/v7,linux/arm64,linux/amd64 --tag your-username/multiarch-example:1.0 .

# another dockerfile e.g. toto.dockerfile
docker image build --tag your-username/multiarch-example:1.0 -f toto.dockerfile
```

### Push an image to DockerHub
```
docker image push your-username/multiarch-example:1.0
```
