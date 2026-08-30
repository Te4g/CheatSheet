---
title: Docker Board VPS deployment
---

Use this setup for a repository that must build an immutable image in GHCR and
deploy it to a VPS where [Docker Board](https://github.com/Te4g/docker-board)
already owns ports `80` and `443` through Traefik.

The application must not run another public reverse proxy or publish its HTTP
port on the host. Its public container joins Docker Board's shared network and
declares Traefik labels.

## Repository requirements

The repository must contain:

- a production-ready `Dockerfile`;
- a root `compose.prod.yaml`;
- a release workflow under `.github/workflows/`;
- a health check for every service started by the production Compose stack.

The reusable deployment workflow copies only `compose.prod.yaml`. Environment
files, bind mounts, Docker secrets, external networks, and other runtime files
must already exist on the VPS.

## Add `compose.prod.yaml`

This example exposes one application that listens on port `8080` inside its
container:

```yaml
services:
    app:
        image: ghcr.io/te4g/my-app:${IMAGE_TAG:?IMAGE_TAG is required}
        restart: unless-stopped
        environment:
            APP_ENV: prod
            APP_SECRET: ${APP_SECRET:?APP_SECRET is required}
        healthcheck:
            test: ["CMD", "curl", "--fail", "--silent", "http://localhost:8080/health"]
            timeout: 5s
            retries: 5
            start_period: 30s
        networks:
            - proxy
        labels:
            - traefik.enable=true
            - traefik.docker.network=${PROXY_NETWORK:-docker-board-proxy}
            - traefik.http.routers.my-app.rule=Host(`${APP_HOST:?APP_HOST is required}`)
            - traefik.http.routers.my-app.entrypoints=https
            - traefik.http.routers.my-app.tls=true
            - traefik.http.routers.my-app.tls.certresolver=letsencrypt
            - traefik.http.services.my-app.loadbalancer.server.port=8080
            - docker-board.enable=true
            - docker-board.name=My App
            - docker-board.description=Production application

networks:
    proxy:
        external: true
        name: ${PROXY_NETWORK:-docker-board-proxy}
```

Replace all occurrences of `my-app`, the GHCR image name, the internal port,
and the health endpoint. Router and Traefik service names must be unique across
the VPS. The health-check command must be available inside the image.

Do not add `ports` to the public service. Traefik reaches it through the shared
network. Leave off `docker-board.enable=true` only when the service should be
routable but hidden from Docker Board.

For a database or another private service, add a separate internal network and
do not attach that service to `proxy`. Every active persistent service still
needs a Docker health check. Every application image beginning with the same
GHCR prefix must use the required `${IMAGE_TAG:?…}` form.

## Document the VPS environment

Add an `.env.prod.example` to the repository without real secrets:

```dotenv
# This file documents /srv/compose/my-app/.env on the VPS.
# The deployment workflow manages IMAGE_TAG automatically.

APP_HOST=my-app.example.com
APP_SECRET=replace-with-a-random-secret
PROXY_NETWORK=docker-board-proxy
```

Do not put `IMAGE_TAG` in the template. The shared workflow creates or updates
it during every deployment while preserving the other VPS values.

## Add the release workflow

Create `.github/workflows/release-production.yml`:

```yaml
name: Release production

on:
    release:
        types: [published]

jobs:
    build:
        permissions:
            contents: read
            packages: write
        uses: Te4g/workflows/.github/workflows/docker-build-publish-ghcr.yml@main
        with:
            image-name: ghcr.io/te4g/my-app
            image-tag: ${{ github.event.release.tag_name }}
            target: production

    deploy:
        needs: build
        permissions:
            contents: read
            packages: read
        uses: Te4g/workflows/.github/workflows/deploy-vps-compose.yml@main
        with:
            image-tag: ${{ needs.build.outputs.image_tag }}
            application-image-prefix: ${{ needs.build.outputs.image_name }}
            deploy-path: /srv/compose/my-app
            health-timeout-seconds: 300
        secrets:
            DEPLOY_HOST: ${{ secrets.DEPLOY_HOST }}
            DEPLOY_PORT: ${{ secrets.DEPLOY_PORT }}
            DEPLOY_USER: ${{ secrets.DEPLOY_USER }}
            DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
            DEPLOY_KNOWN_HOSTS: ${{ secrets.DEPLOY_KNOWN_HOSTS }}
            GHCR_USERNAME: ${{ github.actor }}
            GHCR_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Use a lowercase GHCR image path. Change or remove `target` when the production
stage in the `Dockerfile` has another name or is already the final stage. The
image prefix must be identical in the workflow and `compose.prod.yaml`.

## Add the manual redeploy workflow

Create `.github/workflows/redeploy-production.yml` so an existing release can
be deployed again without rebuilding its image:

```yaml
name: Redeploy production

on:
    workflow_dispatch:
        inputs:
            release_tag:
                description: Existing published release tag to deploy
                required: true
                type: string

concurrency:
    group: production-deployment
    cancel-in-progress: false

jobs:
    validate-release:
        runs-on: ubuntu-latest
        permissions:
            contents: read
        steps:
            - name: Verify release tag
              env:
                  GH_TOKEN: ${{ github.token }}
                  RELEASE_TAG: ${{ inputs.release_tag }}
              run: gh release view "$RELEASE_TAG" --repo "$GITHUB_REPOSITORY" >/dev/null

    deploy:
        needs: validate-release
        permissions:
            contents: read
            packages: read
        uses: Te4g/workflows/.github/workflows/deploy-vps-compose.yml@main
        with:
            image-tag: ${{ inputs.release_tag }}
            application-image-prefix: ghcr.io/te4g/my-app
            source-ref: ${{ inputs.release_tag }}
            deploy-path: /srv/compose/my-app
            health-timeout-seconds: 300
        secrets:
            DEPLOY_HOST: ${{ secrets.DEPLOY_HOST }}
            DEPLOY_PORT: ${{ secrets.DEPLOY_PORT }}
            DEPLOY_USER: ${{ secrets.DEPLOY_USER }}
            DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
            DEPLOY_KNOWN_HOSTS: ${{ secrets.DEPLOY_KNOWN_HOSTS }}
            GHCR_USERNAME: ${{ github.actor }}
            GHCR_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

This workflow contains no build job. It verifies that the release exists and
passes the tag as both `image-tag` and `source-ref`, so the existing GHCR image
and the `compose.prod.yaml` from that exact release are deployed together.

## Prepare the VPS

The examples use a dedicated `deploy` account and `/srv/compose/my-app`:

```bash
# Docker Board must already expose this external network.
docker network inspect docker-board-proxy

sudo install -d -m 0750 -o deploy -g deploy /srv/compose/my-app
sudo install -m 0600 -o deploy -g deploy /dev/null /srv/compose/my-app/.env
sudoedit /srv/compose/my-app/.env
```

Copy the values from `.env.prod.example`, replace them with production values,
and keep `IMAGE_TAG` absent. Confirm that the deployment account can use Docker
without an interactive prompt:

```bash
sudo -u deploy docker info >/dev/null
```

If necessary, add it to the Docker group and start a new login session:

```bash
sudo usermod -aG docker deploy
```

Create the default SSH alias used by the repository configuration helper in
`~/.ssh/config`:

```text
Host rourou-germany
    HostName vps.example.com
    Port 22
    User deploy
    IdentityFile ~/.ssh/deploy@rourou-germany
```

Create a dedicated, non-interactive deployment key on the administrator
machine and authorize its public key for the `deploy` account:

```bash
ssh-keygen -t ed25519 -N '' \
    -f ~/.ssh/deploy@rourou-germany \
    -C deploy@rourou-germany
ssh-copy-id -i ~/.ssh/deploy@rourou-germany.pub rourou-germany
```

Before accepting the host key, compare the displayed fingerprint with the VPS
provider console.

## Configure DNS

Create an `A` record for `my-app.example.com` pointing to the VPS. Add an
`AAAA` record only when IPv6 routing and the VPS firewall are configured. With
Cloudflare proxying enabled, use `Full (strict)` SSL/TLS mode.

## Configure GitHub secrets with the helper

The preferred method is `~/.config/rourou.dev/set-repo-secrets.sh`. It resolves
the host and port from the `rourou-germany` SSH alias, validates the unencrypted
private key, obtains the pinned host keys, and configures these repository
Actions secrets:

- `DEPLOY_HOST`;
- `DEPLOY_PORT`;
- `DEPLOY_USER` as `deploy`;
- `DEPLOY_KEY`;
- `DEPLOY_KNOWN_HOSTS`.

Authenticate the GitHub CLI, then run the helper from the target repository:

```bash
gh auth status --hostname github.com
cd ~/Dev/my-app
~/.config/rourou.dev/set-repo-secrets.sh
```

It can also configure a repository explicitly from any directory:

```bash
~/.config/rourou.dev/set-repo-secrets.sh Te4g/my-app
```

Override the SSH alias or key path when deploying somewhere else:

```bash
SSH_TARGET=my-vps \
DEPLOY_KEY_PATH=~/.ssh/deploy@my-vps \
~/.config/rourou.dev/set-repo-secrets.sh Te4g/my-app
```

The helper displays the resolved non-secret values, redacts the private key,
and shows its fingerprint before changing GitHub. Verify the result without
printing secret values:

```bash
gh secret list --repo Te4g/my-app
```

The helper always configures `DEPLOY_USER=deploy`. Use the manual fallback when
the VPS uses another deployment account. Before its first run against a host,
connect once and verify the SSH fingerprint so the trusted key already exists
in the local `known_hosts` file.

### Manual fallback

Record the VPS host key from a trusted machine, then compare its fingerprint
with the value shown by the VPS provider before using it:

```bash
ssh-keyscan -p 22 vps.example.com > my-app-known-hosts
ssh-keygen -lf my-app-known-hosts
```

Add these repository Actions secrets:

| Secret | Value |
| --- | --- |
| `DEPLOY_HOST` | VPS hostname or IP address |
| `DEPLOY_PORT` | SSH port; optional when it is `22` |
| `DEPLOY_USER` | `deploy` |
| `DEPLOY_KEY` | Contents of `~/.ssh/deploy@rourou-germany` |
| `DEPLOY_KNOWN_HOSTS` | Verified contents of `my-app-known-hosts` |

Using the GitHub CLI:

```bash
gh secret set DEPLOY_HOST --body vps.example.com
gh secret set DEPLOY_PORT --body 22
gh secret set DEPLOY_USER --body deploy
gh secret set DEPLOY_KEY < ~/.ssh/deploy@rourou-germany
gh secret set DEPLOY_KNOWN_HOSTS < my-app-known-hosts
```

The workflow uses its short-lived `GITHUB_TOKEN` for GHCR, so no permanent
registry token is required.

## Deploy a release

Commit and push the three repository files, then publish a Docker-compatible
release tag:

```bash
gh release create v1.0.0 --generate-notes
```

The workflow builds and publishes the immutable GHCR image, uploads
`compose.prod.yaml`, validates the resolved image tag, pulls it with temporary
GHCR credentials, persists `IMAGE_TAG` in the VPS `.env`, starts the stack, and
requires every service to be running and healthy.

To redeploy an existing release without running the build workflow:

```bash
gh release view v1.0.0
gh workflow run redeploy-production.yml -f release_tag=v1.0.0
```

## Verify production

```bash
ssh deploy@vps.example.com
cd /srv/compose/my-app

grep '^IMAGE_TAG=' .env
docker compose -f compose.prod.yaml config --images
docker compose -f compose.prod.yaml ps
docker compose -f compose.prod.yaml logs --tail=100
docker network inspect docker-board-proxy
curl -I https://my-app.example.com
```

The application should also appear in Docker Board.

## Troubleshooting

- `IMAGE_TAG is missing`: the stack has not completed a deployment using the
  current reusable workflow. Deploy a release and check `.env` again.
- Traefik `404`: verify DNS and the `Host(...)` router rule.
- Traefik `502`: verify the shared network and the internal load-balancer port.
- Missing Docker Board card: verify `docker-board.enable=true` and the Traefik
  host rule.
- Deployment health failure: inspect `docker compose ps` and `docker compose
  logs`; the attempted `IMAGE_TAG` remains persisted for diagnostics.

The full reusable workflow contract is documented in
[`Te4g/workflows`](https://github.com/Te4g/workflows/tree/main/docs/deploy-vps-compose).
