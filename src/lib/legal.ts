import { readFileSync } from "node:fs";
import { join } from "node:path";

// Canonical legal documents live in the repo-root `documents/` folder (single
// source of truth, edited by counsel). They are read at build time and rendered
// by the legal pages — never duplicated into the app.
const DOCS_DIR = join(process.cwd(), "..", "documents");

export type LegalSlug = "privacy" | "terms" | "cookies";

const FILE_BY_SLUG: Record<LegalSlug, string> = {
  privacy: "privacy-policy.md",
  terms: "website-terms-of-use.md",
  cookies: "cookie-policy.md",
};

export function getLegalMarkdown(slug: LegalSlug): string {
  return readFileSync(join(DOCS_DIR, FILE_BY_SLUG[slug]), "utf8");
}
