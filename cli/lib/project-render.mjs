import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { renderImage, renderPreset } from "./render-image.mjs";
import { renderVideo, renderVideoPreset } from "./render-video.mjs";
import { ensureDir } from "./paths.mjs";

export async function projectRender(projectDir, outputDir) {
  const root = path.resolve(projectDir);
  const manifestPath = path.join(root, "manifest.yaml");
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`No manifest.yaml in ${root}`);
  }
  const data = parseYaml(fs.readFileSync(manifestPath, "utf8"));
  const assets = data.assets || [];
  if (!assets.length) throw new Error("manifest.yaml has no assets list");

  const outRoot = path.resolve(outputDir || path.join(root, "output"));
  ensureDir(outRoot);

  for (const asset of assets) {
    const src = path.join(root, asset.src);
    if (!fs.existsSync(src)) throw new Error(`Missing source: ${asset.src}`);
    const name = asset.name || path.parse(src).name;
    const fmt = asset.format || "png";
    const scale = Number(asset.scale || 1);
    const preset = asset.preset;
    const type = asset.type || "image";

    if (type === "video") {
      const out = path.join(outRoot, `${name}.mp4`);
      const opts = {
        duration: Number(asset.duration || 4),
        fps: Number(asset.fps || 30),
        scale,
      };
      if (preset) await renderVideoPreset(src, out, preset, opts);
      else {
        if (!asset.width || !asset.height) {
          throw new Error(`${asset.name || asset.src}: video needs preset or width+height`);
        }
        await renderVideo(src, out, { ...opts, width: asset.width, height: asset.height });
      }
      process.stdout.write(`video ${out}\n`);
    } else {
      const out = path.join(outRoot, `${name}.${fmt}`);
      const imageType = fmt === "jpg" || fmt === "jpeg" ? "jpeg" : "png";
      if (preset) await renderPreset(src, out, preset, { scale, type: imageType });
      else {
        if (!asset.width || !asset.height) {
          throw new Error(`${asset.name || asset.src}: image needs preset or width+height`);
        }
        await renderImage(src, out, {
          width: asset.width,
          height: asset.height,
          scale,
          type: imageType,
        });
      }
      process.stdout.write(`image ${out}\n`);
    }
  }
  process.stdout.write(`Done. Output: ${outRoot}\n`);
  return outRoot;
}
