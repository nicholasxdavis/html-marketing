import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { spawn } from "node:child_process";
import { resolvePublic } from "./paths.mjs";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".yaml": "text/yaml",
  ".yml": "text/yaml",
  ".woff2": "font/woff2",
};

function openBrowser(url) {
  const plat = process.platform;
  if (plat === "darwin") spawn("open", [url], { detached: true, stdio: "ignore" });
  else if (plat === "win32") spawn("cmd", ["/c", "start", "", url], { detached: true, stdio: "ignore" });
  else spawn("xdg-open", [url], { detached: true, stdio: "ignore" });
}

export function previewProject(root = process.cwd(), options = {}) {
  const port = Number(options.port || 4173);
  const startFile = options.file || "screenshots/01-hook.html";

  const server = http.createServer((req, res) => {
    const urlPath = (req.url || "/").split("?")[0];
    const rel = urlPath === "/" ? startFile : urlPath;
    const file = resolvePublic(root, rel);
    if (!file) {
      res.writeHead(403);
      res.end("forbidden");
      return;
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      const type = TYPES[path.extname(file).toLowerCase()] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": type });
      res.end(data);
    });
  });

  return new Promise((resolve, reject) => {
    server.on("error", reject);
    server.listen(port, "127.0.0.1", () => {
      const url = `http://127.0.0.1:${port}/${startFile.replace(/\\/g, "/")}`;
      process.stdout.write(`preview: ${url}\n`);
      process.stdout.write("Open the HTML in your browser. Ctrl+C to stop.\n");
      if (!options.noOpen) openBrowser(url);
      resolve(server);
    });
  });
}
