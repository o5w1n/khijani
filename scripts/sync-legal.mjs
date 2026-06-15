// Syncs the web-facing legal documents from the repo-root `documents/` folder
// (the canonical, counsel-edited source of truth) into the marketing app's own
// `src/content/legal/` folder so the app is self-contained at build time.
//
// Why: deployments may build with the app subfolder as the root (e.g. Vercel
// "Root Directory" = khijani-marketing), in which case `../documents` is not
// present. The committed copies in src/content/legal guarantee the build works;
// this script refreshes them from the canonical source whenever it IS reachable
// (local dev, repo-root builds) and no-ops otherwise.

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = join(here, "..");
const canonicalDir = join(appRoot, "..", "documents");
const targetDir = join(appRoot, "src", "content", "legal");

// Web-facing documents only — the portal/app-specific docs stay in documents/.
const FILES = ["privacy-policy.md", "website-terms-of-use.md", "cookie-policy.md"];

if (!existsSync(canonicalDir)) {
  console.log(
    "[sync-legal] documents/ not reachable — using committed copies in src/content/legal.",
  );
  process.exit(0);
}

mkdirSync(targetDir, { recursive: true });
for (const file of FILES) {
  const from = join(canonicalDir, file);
  if (!existsSync(from)) {
    console.warn(`[sync-legal] missing canonical file: ${file} — skipping.`);
    continue;
  }
  copyFileSync(from, join(targetDir, file));
  console.log(`[sync-legal] synced ${file}`);
}
