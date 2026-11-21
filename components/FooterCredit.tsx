"use client";

import { useEffect, useState } from "react";
import {
  FORK_OWNER,
  FORK_PROFILE_URL,
  FORK_REPO_URL,
  UPSTREAM_CONTRIBUTORS_URL,
  UPSTREAM_REPO_URL,
} from "@/lib/site";

const UPSTREAM_X_URL = "https://x.com/younesfdj";

let cachedCount: number | null = null;

// Footer credit — the original project's authors first, then this deployment's
// fork notice. The contributor count is fetched (cached) from /api/contributors
// and counts the UPSTREAM repo, because that is where this code was written.
// Until it lands the number is blurred and then unblurs with a smooth
// transition, so the line never changes shape. Shared by the home, scout-report
// and duel footers so they match.
export default function FooterCredit() {
  const [count, setCount] = useState<number | null>(cachedCount);

  useEffect(() => {
    if (cachedCount !== null) return; // already fetched this page load
    fetch("/api/contributors")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.count === "number") {
          cachedCount = d.count;
          setCount(d.count);
        }
      })
      .catch(() => {});
  }, []);

  const link = "text-ink-dim underline-offset-2 transition hover:text-ink hover:underline";

  return (
    <div className="relative inline-flex max-w-full items-center justify-center">
      {/* weak dark fade behind the credit — soft-edged, no hard pill outline */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-[-18px] inset-y-[-6px] rounded-full bg-bg-deep/70 blur-[10px]"
      />

      <div className="relative flex flex-col items-center justify-center gap-[4px] text-[length:clamp(9px,2.7vw,13.5px)] font-semibold leading-none text-ink-soft">
        <div className="flex flex-wrap items-center justify-center gap-x-[clamp(3px,1.4vw,6px)] gap-y-[4px]">
          <span className="text-ink-mute">Built by</span>

          <a href={UPSTREAM_X_URL} target="_blank" rel="noopener" className={link}>
            @Younes
          </a>

          <span className="text-ink-mute">&amp;</span>

          <a href={UPSTREAM_CONTRIBUTORS_URL} target="_blank" rel="noopener" className={link}>
            <span
              style={{
                filter: count === null ? "blur(5px)" : "blur(0)",
                transition: "filter .5s ease",
              }}
            >
              {count ?? 5}
            </span>{" "}
            amazing contributors
          </a>
        </div>

        {/* Attribution: this is a fork, not a replacement for the upstream repo. */}
        <div className="flex flex-wrap items-center justify-center gap-x-[clamp(3px,1.2vw,5px)] gap-y-[3px] text-[length:clamp(8.5px,2.4vw,11.5px)] font-medium text-ink-mute">
          <span>Self-hosted fork by</span>
          <a href={FORK_PROFILE_URL} target="_blank" rel="noopener" className={link}>
            @{FORK_OWNER}
          </a>
          <span aria-hidden>·</span>
          <a href={FORK_REPO_URL} target="_blank" rel="noopener" className={link}>
            source
          </a>
          <span aria-hidden>·</span>
          <span>not a replacement for</span>
          <a href={UPSTREAM_REPO_URL} target="_blank" rel="noopener" className={link}>
            the original GitHub project
          </a>
        </div>
      </div>
    </div>
  );
}
