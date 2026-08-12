import fs from "node:fs";
import path from "node:path";

const EMDASH = String.fromCharCode(0x2014);
const ENDASH = String.fromCharCode(0x2013);
const EMOJI = new RegExp("[\\u{1F300}-\\u{1FAFF}\\u{2600}-\\u{27BF}\\u{FE0F}\\u{1F1E6}-\\u{1F1FF}]", "u");

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (["node_modules", ".git", "output", "vendor", ".venv", ".agents", ".cursor"].includes(name)) continue;
      walk(full, acc);
    } else if (/\.(html|css|js|mjs|md|yaml|yml)$/i.test(name)) {
      if (name === "lint.mjs") continue;
      acc.push(full);
    }
  }
  return acc;
}

export function lintProject(root = process.cwd()) {
  const files = walk(root);
  const findings = [];

  for (const file of files) {
    if (file.includes(`${path.sep}vendor${path.sep}`)) continue;
    const text = fs.readFileSync(file, "utf8");
    const rel = path.relative(root, file);
    if (text.includes(EMDASH) || text.includes("â€”")) {
      findings.push({ file: rel, level: "error", message: "em dash is not allowed" });
    }
    if (text.includes(ENDASH) || text.includes("â€“")) {
      findings.push({ file: rel, level: "error", message: "en dash is not allowed; use a hyphen" });
    }
    if (EMOJI.test(text) && !rel.startsWith("vendor")) {
      findings.push({ file: rel, level: "error", message: "emoji is not allowed" });
    }
  }

  const htmlFiles = files.filter((f) => f.endsWith(".html") && !f.includes("node_modules"));
  for (const file of htmlFiles) {
    const text = fs.readFileSync(file, "utf8");
    const rel = path.relative(root, file);
    if (!/width:\s*\d+px/.test(text) || !/height:\s*\d+px/.test(text)) {
      findings.push({
        file: rel,
        level: "warn",
        message: "canvas width/height in px not found on body or .canvas",
      });
    }
  }

  return findings;
}

export function printLint(findings) {
  if (!findings.length) {
    process.stdout.write("lint: ok\n");
    return 0;
  }
  for (const f of findings) {
    process.stdout.write(`  [${f.level}] ${f.file}: ${f.message}\n`);
  }
  return findings.some((f) => f.level === "error") ? 1 : 0;
}
