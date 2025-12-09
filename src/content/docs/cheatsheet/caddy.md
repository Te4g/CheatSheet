---
title: Caddy
---

## Quickly expose the current directory with Caddy using docker
```bash
docker run --rm --interactive --tty --volume $(pwd):/srv --publish ${1:-8090}:80 caddy caddy file-server --browse
```

## Extract Caddyfile from docker image
```bash
docker run --rm caddy cat /etc/caddy/Caddyfile > Caddyfile
```

## Run caddy with docker and override default Caddyfile
```bash
mkdir -p conf
curl https://raw.githubusercontent.com/caddyserver/dist/refs/heads/master/config/Caddyfile > conf/Caddyfile
docker run --rm -p 8100:80 \
    -v $PWD/conf:/etc/caddy \
    -v caddy_data:/data \
    caddy
```
