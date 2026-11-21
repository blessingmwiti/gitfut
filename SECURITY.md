# Security Policy

## Reporting a vulnerability

Please **do not** open a public issue for security problems.

This repository is a self-hosted fork of GitFut. Report problems in **this
deployment** privately through GitHub's **[private vulnerability reporting](https://github.com/blessingmwiti/gitfut/security/advisories/new)**
(repo → **Security** → **Report a vulnerability**). If that isn't available,
open a minimal issue asking for a private contact channel — do not include
exploit details in it.

Please include:

- what the issue is and where (a URL, endpoint, or file),
- steps to reproduce, ideally a small proof of concept,
- the impact you believe it has.

You'll get an acknowledgement within **72 hours** and updates as fixes land.
Please give a reasonable window to patch before any public disclosure.

## Upstream vulnerabilities

If the issue exists in the original GitFut project (and not in this fork's
deployment changes), please report it to the upstream project instead:
**[Younesfdj/gitfut security advisories](https://github.com/Younesfdj/gitfut/security/advisories/new)**
or **ferradjiyounes69@gmail.com**, as described in the upstream `SECURITY.md`.

## Scope

**In scope**

- the **gitfut.blessingmwiti.com** web app and its API routes,
- deployment-specific changes in this repository (config, Docker, nginx).

**Out of scope**

- issues that require a compromised GitHub account or a leaked token,
- rate-limiting / denial-of-service on the public GitHub-backed endpoints (they're best-effort by design),
- vulnerabilities in third-party dependencies with no working exploit against GitFut (please report those upstream),
- automated scanner output with no demonstrated impact.

## Supported versions

GitFut is a continuously-deployed web app — only the currently deployed fork
(tracking `master` of `blessingmwiti/gitfut`) is supported. There are no tagged
releases to backport fixes to.

Thanks for helping keep scouts safe. 🛡️
