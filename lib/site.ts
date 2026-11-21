// Deployment identity for this self-hosted fork.
//
// The original GitFut is made by Younesfdj and lived at gitfut.com:
//   https://github.com/Younesfdj/gitfut
// This repository is a fork, run independently at the URL below. It is NOT a
// replacement for, or affiliated with, the upstream project — see NOTICE.
//
// NEXT_PUBLIC_SITE_URL is inlined at build time, so it must be set when the
// image is built (docker-compose.yml passes it as a build arg). The fallback is
// this fork's own domain, which keeps local dev, tests and a default build
// pointing at the right place.

const FALLBACK_SITE_URL = "https://gitfut.blessingmwiti.com";

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK_SITE_URL;
  try {
    return new URL(raw).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl();
export const SITE_HOST = new URL(SITE_URL).host;
// Maker's mark printed on exported/embedded cards. The full host is too wide
// for the card footer, so it is rendered smaller when it isn't a short domain.
export const SITE_MARK = SITE_HOST.toUpperCase();

export const SITE_NAME = "GitFut";

// Upstream project — attribution, not ownership.
export const UPSTREAM_AUTHOR = "Younesfdj";
export const UPSTREAM_REPO_SLUG = "Younesfdj/gitfut";
export const UPSTREAM_REPO_URL = `https://github.com/${UPSTREAM_REPO_SLUG}`;
export const UPSTREAM_CONTRIBUTORS_URL = `${UPSTREAM_REPO_URL}/graphs/contributors`;
export const UPSTREAM_SITE_URL = "https://gitfut.com";

// The fork that this deployment is built from.
export const FORK_OWNER = "blessingmwiti";
export const FORK_REPO_SLUG = `${FORK_OWNER}/gitfut`;
export const FORK_REPO_URL = `https://github.com/${FORK_REPO_SLUG}`;
export const FORK_PROFILE_URL = `https://github.com/${FORK_OWNER}`;
