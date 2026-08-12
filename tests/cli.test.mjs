import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { CORE_SKILLS, updateSkills } from "../cli/lib/skills.mjs";
import { initProject } from "../cli/lib/init.mjs";
import { resolvePublic } from "../cli/lib/paths.mjs";

test("resolvePublic blocks path escape", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "hm-pub-"));
  fs.writeFileSync(path.join(dir, "ok.html"), "ok");
  assert.ok(resolvePublic(dir, "ok.html").endsWith("ok.html"));
  assert.equal(resolvePublic(dir, "../secret"), null);
});

test("skills update installs core plus the named workflow", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "hm-sk-"));
  const installed = updateSkills(["social-post"], { cwd });
  for (const name of CORE_SKILLS) {
    assert.ok(installed.includes(name), `missing core ${name}`);
    assert.ok(fs.existsSync(path.join(cwd, ".agents", "skills", name, "SKILL.md")));
  }
  assert.ok(installed.includes("social-post"));
  assert.ok(fs.existsSync(path.join(cwd, ".agents", "skills", "social-post", "SKILL.md")));
});

test("init scaffolds a previewable project", () => {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), "hm-init-"));
  const prev = process.cwd();
  process.chdir(parent);
  try {
    const dest = initProject("demo", { force: true });
    assert.ok(fs.existsSync(path.join(dest, "manifest.yaml")));
    assert.ok(fs.existsSync(path.join(dest, "shared", "tokens.css")));
    assert.ok(fs.existsSync(path.join(dest, "prompts", "styles", "atlas.md")));
    assert.ok(fs.existsSync(path.join(dest, "screenshots", "01-hook.html")));
    const html = fs.readFileSync(path.join(dest, "screenshots", "01-hook.html"), "utf8");
    assert.match(html, /href="\.\.\/shared\/tokens\.css"/);
    assert.ok(fs.existsSync(path.join(dest, ".agents", "skills", "html-marketing", "SKILL.md")));
  } finally {
    process.chdir(prev);
  }
});
