import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright";
import { ensureDir, fileUrl } from "./paths.mjs";
import { getPreset } from "./sizes.mjs";
import { findFfmpeg } from "./doctor.mjs";

export async function renderVideo(htmlPath, outputPath, options) {
  const {
    width,
    height,
    duration = 4,
    fps = 30,
    scale = 1,
  } = options;

  const ffmpeg = findFfmpeg();
  if (!ffmpeg) {
    throw new Error(
      "ffmpeg not found on PATH. Install FFmpeg for your OS, then reopen the terminal.",
    );
  }

  const absHtml = path.resolve(htmlPath);
  const absOut = path.resolve(outputPath);
  ensureDir(path.dirname(absOut));
  const deviceScale = Math.max(1, Math.min(3, Number(scale) || 1));
  const frameCount = Math.max(1, Math.round(duration * fps));
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "html-marketing-"));

  const browser = await chromium.launch();
  try {
    try {
      const context = await browser.newContext({
        viewport: { width, height },
        deviceScaleFactor: deviceScale,
        colorScheme: "light",
      });
      const page = await context.newPage();
      await page.goto(fileUrl(absHtml), { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(150);

      const hasSeek = await page.evaluate(() => typeof window.__hm?.seek === "function");

      for (let i = 0; i < frameCount; i += 1) {
        const t = i / fps;
        if (hasSeek) {
          await page.evaluate((time) => window.__hm.seek(time), t);
          await page.waitForTimeout(16);
        } else if (i > 0) {
          await page.waitForTimeout(Math.round(1000 / fps));
        }
        await page.screenshot({
          path: path.join(tmp, `frame_${String(i).padStart(5, "0")}.png`),
          type: "png",
          animations: "allow",
          caret: "hide",
          scale: "css",
        });
      }
    } finally {
      await browser.close();
    }

    const result = spawnSync(
      ffmpeg,
      [
        "-y",
        "-framerate",
        String(fps),
        "-i",
        path.join(tmp, "frame_%05d.png"),
        "-c:v",
        "libx264",
        "-pix_fmt",
        "yuv420p",
        "-crf",
        "18",
        "-movflags",
        "+faststart",
        absOut,
      ],
      { encoding: "utf8" },
    );
    if (result.status !== 0) {
      throw new Error(result.stderr || "ffmpeg failed");
    }
    return absOut;
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

export async function renderVideoPreset(htmlPath, outputPath, presetId, options = {}) {
  const preset = getPreset(presetId);
  return renderVideo(htmlPath, outputPath, {
    ...options,
    width: preset.width,
    height: preset.height,
  });
}
