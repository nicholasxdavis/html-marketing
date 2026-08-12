import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

export const PKG_ROOT = path.resolve(here, "../..");

export function fileUrl(filePath) {
  const resolved = path.resolve(filePath);
  let pathname = resolved.replace(/\\/g, "/");
  if (!pathname.startsWith("/")) pathname = `/${pathname}`;
  return encodeURI(`file://${pathname}`);
}

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

export function readUtf8(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

export function writeUtf8(filePath, text) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, text, "utf8");
}

export function copyDir(src, dest) {
  fs.cpSync(src, dest, { recursive: true, force: true });
}

export function exists(filePath) {
  try {
    fs.accessSync(filePath);
    return true;
  } catch {
    return false;
  }
}

export function resolvePublic(root, urlPath) {
  const rootAbs = path.resolve(root);
  const rel = decodeURIComponent(String(urlPath || "/").split("?")[0]).replace(/^\/+/, "");
  const resolved = path.resolve(rootAbs, rel || ".");
  const prefix = rootAbs.endsWith(path.sep) ? rootAbs : `${rootAbs}${path.sep}`;
  if (resolved !== rootAbs && !resolved.startsWith(prefix)) return null;
  return resolved;
}
