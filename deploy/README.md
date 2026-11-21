# Deploying this fork

This is the layout running at **https://gitfut.blessingmwiti.com**.

## Server

- Ubuntu, Docker + Docker Compose
- App checkout: `/opt/gitfut`
- Secrets: `/opt/gitfut/.env` (root-owned, mode 600)
- Container: `gitfut`, host networking, listens on `127.0.0.1:3100`
- Redis: host `redis://127.0.0.1:6379/1` (optional, used for cache/counters)
- nginx vhost: `/etc/nginx/sites-available/gitfut.blessingmwiti.com`
- Cloudflare: proxied (orange cloud), SSL mode **Full**, origin self-signed cert
  under `/etc/nginx/ssl/gitfut/`

## First deploy / update

```bash
ssh root@173.212.201.157
cd /opt/gitfut
git pull --ff-only
docker compose up -d --build
```

`NEXT_PUBLIC_SITE_URL` is a build-time value. `docker-compose.yml` passes the
value from `.env` as a build arg, so changing the domain requires a rebuild, not
just a restart.

## Environment

```bash
cp .env.example .env
chmod 600 .env
# Required for live scouting; public read-only is enough:
#   GITHUB_TOKEN=...
# Optional:
#   REDIS_URL=redis://127.0.0.1:6379/1
```

## nginx / TLS

```bash
cp deploy/nginx.conf /etc/nginx/sites-available/gitfut.blessingmwiti.com
ln -sf /etc/nginx/sites-available/gitfut.blessingmwiti.com /etc/nginx/sites-enabled/
# create the origin cert first (see the comment at the top of deploy/nginx.conf)
nginx -t && systemctl reload nginx
```

Because Cloudflare proxies the hostname, visitors get Cloudflare's public
certificate; the origin cert only covers Cloudflare → server. For
**Full (strict)**, replace the self-signed origin cert with a Cloudflare Origin
CA certificate.

## Health check

```bash
curl -sI https://gitfut.blessingmwiti.com/
curl -s https://gitfut.blessingmwiti.com/robots.txt
docker ps --filter name=gitfut
docker logs --tail 50 gitfut
```
