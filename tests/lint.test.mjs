import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { lintProject } from "../cli/lib/lint.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("authored trees have no em dash or emoji errors", () => {
  const findings = lintProject(root).filter((f) => {
    const file = f.file.replaceAll("\\", "/");
    if (file.startsWith("vendor/")) return false;
    if (file.startsWith(".venv/")) return false;
    if (file.startsWith("node_modules/")) return false;
    return f.level === "error";
  });
  assert.deepEqual(findings, []);
});
