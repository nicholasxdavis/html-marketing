import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { renderPreset } from "../cli/lib/render-image.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function pngSize(buf) {
  assert.equal(buf.subarray(0, 8).toString("binary"), "\u0089PNG\r\n\u001a\n");
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

test("hook screenshot exports 1280x800", async () => {
  const html = path.join(root, "projects/demo-extension/screenshots/01-hook.html");
  const out = path.join(os.tmpdir(), `hm-hook-${Date.now()}.png`);
  await renderPreset(html, out, "cws-screenshot");
  const buf = fs.readFileSync(out);
  const { width, height } = pngSize(buf);
  assert.equal(width, 1280);
  assert.equal(height, 800);
  fs.unlinkSync(out);
});

test("promo tile exports 440x280", async () => {
  const html = path.join(root, "projects/demo-extension/promo/promo.html");
  const out = path.join(os.tmpdir(), `hm-tile-${Date.now()}.png`);
  await renderPreset(html, out, "cws-promo-tile");
  const buf = fs.readFileSync(out);
  const { width, height } = pngSize(buf);
  assert.equal(width, 440);
  assert.equal(height, 280);
  fs.unlinkSync(out);
});
