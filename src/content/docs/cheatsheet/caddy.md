---
title: Caddy
---

## Quickly expose the current directory with Caddy using docker
```bash
docker run --rm --interactive --tty --volume $(pwd):/srv --publish ${1:-8090}:80 caddy caddy file-server --browse
```
