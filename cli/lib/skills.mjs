import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { PKG_ROOT, copyDir, ensureDir } from "./paths.mjs";

export const CORE_SKILLS = [
  "html-marketing",
  "html-marketing-core",
  "html-marketing-creative",
  "html-marketing-cli",
  "html-marketing-device",
  "html-marketing-prompts",
];

export const WORKFLOW_SKILLS = [
  "store-listing",
  "promo-graphics",
  "motion-sting",
  "product-launch-set",
  "social-post",
];

function skillSource(name) {
  return path.join(PKG_ROOT, "skills", name);
}

export function destDirs(cwd = process.cwd()) {
  return [
    path.join(cwd, ".agents", "skills"),
    path.join(cwd, ".cursor", "skills"),
    path.join(os.homedir(), ".agents", "skills"),
  ];
}

export function listSkills() {
  const dir = path.join(PKG_ROOT, "skills");
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

export function updateSkills(names = [], { cwd = process.cwd() } = {}) {
  const extra = names.filter(Boolean);
  const known = listSkills();
  for (const name of extra) {
    if (!known.includes(name)) {
      throw new Error(`Unknown skill '${name}'. Known: ${known.join(", ")}`);
    }
  }
  const wanted = [...new Set([...CORE_SKILLS, ...extra])];
  const installed = [];
  for (const name of wanted) {
    const src = skillSource(name);
    for (const destRoot of destDirs(cwd)) {
      ensureDir(destRoot);
      copyDir(src, path.join(destRoot, name));
    }
    installed.push(name);
  }
  process.stdout.write(`skills update: ${installed.join(", ")}\n`);
  process.stdout.write("Copied into .agents/skills, .cursor/skills, and ~/.agents/skills\n");
  return installed;
}

export function checkSkills(cwd = process.cwd()) {
  const root = path.join(cwd, ".agents", "skills");
  const missing = CORE_SKILLS.filter((name) => !fs.existsSync(path.join(root, name, "SKILL.md")));
  const ok = missing.length === 0;
  if (ok) process.stdout.write("skills check: ok\n");
  else {
    process.stdout.write(`skills check: missing ${missing.join(", ")}\n`);
    process.stdout.write("Run: npx html-marketing skills update\n");
  }
  return ok ? 0 : 1;
}
