import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderImage, renderPreset } from "../cli/lib/render-image.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const demo = path.join(root, "projects/demo-extension");
const out = path.join(root, "docs/assets/examples");
const wait = { waitMs: 800 };

await renderImage(
  path.join(root, "templates/brand/logo.html"),
  path.join(root, "docs/assets/logo.png"),
  { width: 1400, height: 420, ...wait },
);
console.log("logo");

const shots = [
  ["01-hook", "screenshots/01-hook.html", "cws-screenshot"],
  ["02-mechanism", "screenshots/02-mechanism.html", "cws-screenshot"],
  ["03-differentiator", "screenshots/03-differentiator.html", "cws-screenshot"],
  ["04-benefit", "screenshots/04-benefit.html", "cws-screenshot"],
  ["05-trust", "screenshots/05-trust.html", "cws-screenshot"],
  ["promo-tile", "promo/promo.html", "cws-promo-tile"],
  ["marquee", "promo/marquee.html", "cws-marquee"],
];

for (const [name, src, preset] of shots) {
  await renderPreset(path.join(demo, src), path.join(out, `${name}.png`), preset, wait);
  console.log(name);
}

await renderPreset(
  path.join(root, "templates/app-store/screenshot/01-hook.html"),
  path.join(out, "ios-6-9-hook.png"),
  "ios-6-9",
  wait,
);
console.log("ios-6-9-hook");
console.log("docs assets ready");
