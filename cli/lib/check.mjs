import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { fileUrl } from "./paths.mjs";
import { lintProject, printLint } from "./lint.mjs";

export async function checkProject(root = process.cwd()) {
  const findings = lintProject(root);
  const lintCode = printLint(findings);
  if (lintCode !== 0) return lintCode;

  const htmlFiles = [];
  const walk = (dir) => {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const st = fs.statSync(full);
      if (st.isDirectory()) {
        if (["node_modules", "output", "vendor", ".git", ".venv", ".agents", ".cursor"].includes(name)) continue;
        walk(full);
      } else if (name.endsWith(".html")) htmlFiles.push(full);
    }
  };
  walk(root);

  const browser = await chromium.launch();
  try {
    for (const file of htmlFiles) {
      const page = await browser.newPage();
      const errors = [];
      page.on("pageerror", (err) => errors.push(err.message));
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });
      await page.goto(fileUrl(file), { waitUntil: "networkidle", timeout: 30000 });
      await page.close();
      const rel = path.relative(root, file);
      if (errors.length) {
        process.stdout.write(`  [error] ${rel}: ${errors.join("; ")}\n`);
        return 1;
      }
      process.stdout.write(`  [ok] ${rel}\n`);
    }
  } finally {
    await browser.close();
  }
  process.stdout.write("check: ok\n");
  return 0;
}
