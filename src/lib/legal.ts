import { readFileSync } from "node:fs";
import { join } from "node:path";

// The canonical legal documents live in the repo-root `documents/` folder. To
// keep the app self-contained at build time (deploys may root at this subfolder,
// where `../documents` is not present), the web-facing docs are synced into
// `src/content/legal/` by `scripts/sync-legal.mjs` (run via the `prebuild`/
// `predev` hooks). Read from there, not from outside the app root.
const DOCS_DIR = join(process.cwd(), "src", "content", "legal");

export type LegalSlug = "privacy" | "terms" | "cookies";

const FILE_BY_SLUG: Record<LegalSlug, string> = {
  privacy: "privacy-policy.md",
  terms: "website-terms-of-use.md",
  cookies: "cookie-policy.md",
};

export function getLegalMarkdown(slug: LegalSlug): string {
  return readFileSync(join(DOCS_DIR, FILE_BY_SLUG[slug]), "utf8");
}
