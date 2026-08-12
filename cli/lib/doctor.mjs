import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

function which(bin) {
  const envPath = process.env.PATH || "";
  const sep = process.platform === "win32" ? ";" : ":";
  const ext = process.platform === "win32" ? [".exe", ".cmd", ".bat", ""] : [""];
  for (const dir of envPath.split(sep)) {
    for (const e of ext) {
      const candidate = path.join(dir, bin + e);
      try {
        fs.accessSync(candidate);
        return candidate;
      } catch {
        /* continue */
      }
    }
  }
  return null;
}

export function findFfmpeg() {
  return which("ffmpeg");
}

export async function runDoctor({ json = false } = {}) {
  const rows = [];

  rows.push({ status: "OK", label: "Node.js", detail: process.version });

  const ffmpeg = findFfmpeg();
  if (ffmpeg) {
    const out = spawnSync(ffmpeg, ["-version"], { encoding: "utf8" });
    const line = (out.stdout || "").split("\n")[0] || ffmpeg;
    rows.push({ status: "OK", label: "FFmpeg", detail: line.trim() });
  } else {
    rows.push({
      status: "FAIL",
      label: "FFmpeg",
      detail: "not on PATH (required for video export)",
    });
  }

  try {
    const browser = await chromium.launch();
    await browser.close();
    rows.push({ status: "OK", label: "Playwright Chromium", detail: "launchable" });
  } catch (err) {
    rows.push({
      status: "FAIL",
      label: "Playwright Chromium",
      detail: `${err.message} - run: npx playwright install chromium`,
    });
  }

  const ok = !rows.some((r) => r.status === "FAIL");
  if (json) {
    process.stdout.write(`${JSON.stringify({ ok, rows }, null, 2)}\n`);
  } else {
    process.stdout.write("html-marketing doctor\n");
    for (const row of rows) {
      process.stdout.write(`  [${row.status}] ${row.label}: ${row.detail}\n`);
    }
  }
  return ok ? 0 : 1;
}
