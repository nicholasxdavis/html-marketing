import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  filterPresets,
  formatPreset,
  getPreset,
  listPresets,
  platforms,
  PRESETS,
} from "../cli/lib/sizes.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bin = path.join(root, "bin", "html-marketing.mjs");

test("required store sizes exist", () => {
  assert.equal(PRESETS["cws-screenshot"].width, 1280);
  assert.equal(PRESETS["cws-screenshot"].height, 800);
  assert.equal(PRESETS["cws-promo-tile"].width, 440);
  assert.equal(PRESETS["cws-marquee"].width, 1400);
  assert.equal(PRESETS["ios-6-9"].width, 1320);
  assert.equal(PRESETS["ios-6-9"].height, 2868);
  assert.equal(PRESETS["play-feature"].width, 1024);
});

test("social and avatar presets exist", () => {
  assert.equal(PRESETS["yt-thumb"].width, 1280);
  assert.equal(PRESETS["yt-thumb"].height, 720);
  assert.equal(PRESETS["ig-post"].width, 1080);
  assert.equal(PRESETS["ig-post"].height, 1350);
  assert.equal(PRESETS["ig-story"].height, 1920);
  assert.equal(PRESETS["x-post"].width, 1600);
  assert.equal(PRESETS["fb-post"].height, 1350);
  assert.equal(PRESETS["reddit-banner"].width, 1920);
  assert.equal(PRESETS["reddit-pfp"].width, 256);
  assert.equal(PRESETS["og-card"].width, 1200);
  assert.equal(PRESETS["pfp-1024"].width, 1024);
  assert.equal(PRESETS["li-post"].width, 1200);
  assert.equal(PRESETS["tiktok-post"].height, 1920);
});

test("getPreset throws on unknown", () => {
  assert.throws(() => getPreset("not-a-size"));
});

test("listPresets is non-empty", () => {
  assert.ok(listPresets().length >= 40);
});

test("filter by platform and kind", () => {
  const yt = filterPresets({ platform: "youtube" });
  assert.ok(yt.every((p) => p.platform === "youtube"));
  assert.ok(yt.some((p) => p.id === "yt-thumb"));
  const pfps = filterPresets({ kind: "pfp" });
  assert.ok(pfps.length >= 8);
  const reddit = filterPresets({ query: "reddit" });
  assert.ok(reddit.every((p) => p.platform === "reddit" || /reddit/i.test(p.id)));
});

test("platforms include store and social", () => {
  const names = platforms();
  for (const p of ["chrome-web-store", "app-store", "google-play", "youtube", "instagram", "x", "facebook", "reddit"]) {
    assert.ok(names.includes(p), `missing platform ${p}`);
  }
});

test("formatPreset includes size", () => {
  assert.match(formatPreset(PRESETS["cws-screenshot"]), /1280x800/);
});

test("cli sizes lookup prints preset", () => {
  const out = execFileSync(process.execPath, [bin, "sizes", "yt-thumb"], { encoding: "utf8" });
  assert.match(out, /1280x720/);
  assert.match(out, /youtube/);
});
