import fs from "node:fs";
import path from "node:path";
import { PKG_ROOT, copyDir, ensureDir, writeUtf8 } from "./paths.mjs";
import { updateSkills } from "./skills.mjs";

function rewriteShared(html) {
  return html.replaceAll('href="../../shared/', 'href="../shared/');
}

export function initProject(name, options = {}) {
  const dest = path.resolve(process.cwd(), name);
  if (fs.existsSync(dest) && fs.readdirSync(dest).length && !options.force) {
    throw new Error(`${dest} already exists. Pass --force to overwrite files.`);
  }
  ensureDir(dest);

  const sharedSrc = path.join(PKG_ROOT, "templates", "shared");
  const shotSrc = path.join(PKG_ROOT, "templates", "chrome-store", "screenshot");
  const promoSrc = path.join(PKG_ROOT, "templates", "chrome-store", "promo-tile");
  const marqueeSrc = path.join(PKG_ROOT, "templates", "chrome-store", "marquee");
  const videoSrc = path.join(PKG_ROOT, "templates", "chrome-store", "video");

  copyDir(sharedSrc, path.join(dest, "shared"));
  ensureDir(path.join(dest, "screenshots"));
  ensureDir(path.join(dest, "promo"));
  ensureDir(path.join(dest, "video"));
  ensureDir(path.join(dest, "output"));

  for (const file of fs.readdirSync(shotSrc).filter((f) => f.endsWith(".html"))) {
    const html = fs.readFileSync(path.join(shotSrc, file), "utf8");
    writeUtf8(path.join(dest, "screenshots", file), rewriteShared(html));
  }
  writeUtf8(
    path.join(dest, "promo", "promo.html"),
    rewriteShared(fs.readFileSync(path.join(promoSrc, "promo.html"), "utf8")),
  );
  writeUtf8(
    path.join(dest, "promo", "marquee.html"),
    rewriteShared(fs.readFileSync(path.join(marqueeSrc, "marquee.html"), "utf8")),
  );
  writeUtf8(
    path.join(dest, "video", "sting-4s.html"),
    rewriteShared(fs.readFileSync(path.join(videoSrc, "sting-4s.html"), "utf8")),
  );

  copyDir(path.join(PKG_ROOT, "prompts"), path.join(dest, "prompts"));

  writeUtf8(
    path.join(dest, "package.json"),
    `${JSON.stringify(
      {
        name,
        private: true,
        scripts: {
          doctor: "npx html-marketing doctor",
          preview: "npx html-marketing preview",
          lint: "npx html-marketing lint",
          check: "npx html-marketing check",
          render: "npx html-marketing render",
        },
      },
      null,
      2,
    )}\n`,
  );

  writeUtf8(
    path.join(dest, "manifest.yaml"),
    `name: ${name}
product: ${name}
platform: chrome-web-store
style: atlas
layout: harbor

assets:
  - name: 01-hook
    src: screenshots/01-hook.html
    preset: cws-screenshot
    format: png
  - name: 02-mechanism
    src: screenshots/02-mechanism.html
    preset: cws-screenshot
    format: png
  - name: 03-differentiator
    src: screenshots/03-differentiator.html
    preset: cws-screenshot
    format: png
  - name: 04-benefit
    src: screenshots/04-benefit.html
    preset: cws-screenshot
    format: png
  - name: 05-trust
    src: screenshots/05-trust.html
    preset: cws-screenshot
    format: png
  - name: promo-tile
    src: promo/promo.html
    preset: cws-promo-tile
    format: png
  - name: marquee
    src: promo/marquee.html
    preset: cws-marquee
    format: png
  - name: sting
    src: video/sting-4s.html
    type: video
    preset: hd-landscape
    duration: 4
    fps: 30
    format: mp4
`,
  );

  writeUtf8(
    path.join(dest, "BRIEF.md"),
    `# Brief

workflow: store-listing
style: atlas
layout: harbor
platform: chrome-web-store

Replace the Northline copy with your product. Keep Field + Caption + Device.
Do not invent a look. Paste prompts/styles/atlas.md.
Look up sizes: npx html-marketing sizes cws-screenshot
`,
  );

  updateSkills([], { cwd: dest });

  process.stdout.write(`init: ${dest}\n`);
  process.stdout.write("Next:\n");
  process.stdout.write(`  cd ${name}\n`);
  process.stdout.write("  npx html-marketing preview\n");
  process.stdout.write("  npx html-marketing render\n");
  return dest;
}
