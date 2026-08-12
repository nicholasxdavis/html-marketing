import fs from "node:fs";
import path from "node:path";
import { PKG_ROOT } from "./paths.mjs";

const sizesPath = path.join(PKG_ROOT, "data", "sizes.json");

export const PRESETS = JSON.parse(fs.readFileSync(sizesPath, "utf8"));

export function getPreset(id) {
  const preset = PRESETS[id];
  if (!preset) {
    const known = Object.keys(PRESETS).sort().join(", ");
    throw new Error(`Unknown size preset '${id}'. Known: ${known}`);
  }
  return preset;
}

export function listPresets() {
  return Object.values(PRESETS);
}

export function platforms() {
  return [...new Set(listPresets().map((p) => p.platform))].sort();
}

export function filterPresets({ platform, kind, query } = {}) {
  const q = (query || "").toLowerCase().trim();
  return listPresets().filter((p) => {
    if (platform && p.platform !== platform) return false;
    if (kind && p.kind !== kind) return false;
    if (!q) return true;
    const hay = `${p.id} ${p.platform} ${p.kind} ${p.notes || ""}`.toLowerCase();
    return hay.includes(q) || p.id === q;
  });
}

export function formatPreset(p) {
  const size = `${p.width}x${p.height}`;
  const extra = [];
  if (p.min != null) extra.push(`min ${p.min}`);
  if (p.max != null) extra.push(`max ${p.max}`);
  if (p.required) extra.push("required");
  if (p.transparency === false) extra.push("no alpha");
  if (p.safe?.x) extra.push(`safe ${p.safe.x}x${p.safe.y}`);
  if (p.safe?.topPct) extra.push(`safe top/bottom ${p.safe.topPct}%`);
  const meta = extra.length ? `  (${extra.join(", ")})` : "";
  return `${p.id.padEnd(22)} ${size.padEnd(12)} ${p.platform.padEnd(18)} ${p.kind}${meta}`;
}
