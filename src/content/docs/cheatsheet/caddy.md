---
title: Caddy
---

## Quickly expose the current directory with Caddy using docker
```bash
docker run --rm -it \
  --volume "$PWD:/srv:ro" \
  --publish "0.0.0.0:${1:-8090}:80" \
  caddy caddy file-server \
  --root /srv --listen :80 --browse --debug --access-log
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
    --add-host=host.docker.internal:host-gateway
    caddy
```

- Caddyfile example when running in docker on Linux (use host.docker.internal)
```bash
:80 {
    reverse_proxy host.docker.internal:8000
}
```
