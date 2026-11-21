import "server-only";
import { FORK_REPO_SLUG, UPSTREAM_REPO_SLUG } from "@/lib/site";

// The star count belongs to the repo this deployment is built from (the fork);
// the contributor credit stays pointed at the upstream repo because those are
// the people who actually wrote the code. Both are best-effort and cached for
// an hour (revalidate), so one cached call covers all visitors.
const STARS_REPO = FORK_REPO_SLUG;
const CONTRIBUTORS_REPO = UPSTREAM_REPO_SLUG;

// Best-effort star count, cached for an hour (revalidate) so it's fast and never
// rate-limited — one cached call covers all visitors instead of each browser
// hitting GitHub. Returns null on any failure; the UI degrades to a plain link.
export async function getRepoStars(): Promise<number | null> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const res = await fetch(`https://api.github.com/repos/${STARS_REPO}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : null;
  } catch {
    return null;
  }
}

// How many people OTHER than the owner have landed commits — powers the footer
// contributor credit. Asking for one contributor per
// page makes the Link header's last-page number equal the total contributor
// count, so we never page through the whole list. Cached for an hour like the
// star count; null on any failure so the footer degrades to just the owner.
export async function getContributorCount(): Promise<number | null> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const res = await fetch(
      `https://api.github.com/repos/${CONTRIBUTORS_REPO}/contributors?per_page=1&anon=0`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return null;
    // With per_page=1 the last page index == total contributors.
    const last = res.headers
      .get("link")
      ?.match(/[?&]page=(\d+)>;\s*rel="last"/);
    const total = last
      ? Number(last[1])
      : ((await res.json()) as unknown[]).length; // 0–1 contributors, no Link
    return Math.max(0, total - 1); // drop the owner from the count
  } catch {
    return null;
  }
}
