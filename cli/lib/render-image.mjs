import path from "node:path";
import { chromium } from "playwright";
import { ensureDir, fileUrl } from "./paths.mjs";
import { getPreset } from "./sizes.mjs";

export async function renderImage(htmlPath, outputPath, options) {
  const {
    width,
    height,
    scale = 1,
    type = "png",
    quality = 92,
    waitMs = 250,
    selector = null,
    omitBackground = false,
  } = options;

  const absHtml = path.resolve(htmlPath);
  const absOut = path.resolve(outputPath);
  ensureDir(path.dirname(absOut));
  const deviceScale = Math.max(1, Math.min(3, Number(scale) || 1));

  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: deviceScale,
      colorScheme: "light",
    });
    const page = await context.newPage();
    await page.goto(fileUrl(absHtml), { waitUntil: "networkidle", timeout: 30000 });
    await page.evaluate(() => document.fonts?.ready ?? Promise.resolve());
    if (waitMs > 0) await page.waitForTimeout(waitMs);
    await page.evaluate(() => {
      for (const a of document.getAnimations()) {
        try {
          a.pause();
          const dur = a.effect?.getTiming?.().duration;
          if (typeof dur === "number") a.currentTime = dur;
        } catch {
          /* ignore unseekable animations */
        }
      }
    });

    const shot = {
      path: absOut,
      type,
      animations: "disabled",
      caret: "hide",
      scale: "css",
    };
    if (type === "jpeg") shot.quality = quality;
    if (omitBackground && type === "png") shot.omitBackground = true;

    if (selector) await page.locator(selector).screenshot(shot);
    else await page.screenshot(shot);
  } finally {
    await browser.close();
  }
  return absOut;
}

export async function renderPreset(htmlPath, outputPath, presetId, options = {}) {
  const preset = getPreset(presetId);
  return renderImage(htmlPath, outputPath, {
    ...options,
    width: preset.width,
    height: preset.height,
  });
}
