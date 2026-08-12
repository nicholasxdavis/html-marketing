#!/usr/bin/env node
import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import { PKG_ROOT } from "./lib/paths.mjs";
import { PRESETS, filterPresets, formatPreset, getPreset, platforms } from "./lib/sizes.mjs";
import { renderImage, renderPreset } from "./lib/render-image.mjs";
import { renderVideo, renderVideoPreset } from "./lib/render-video.mjs";
import { runDoctor } from "./lib/doctor.mjs";
import { lintProject, printLint } from "./lib/lint.mjs";
import { checkProject } from "./lib/check.mjs";
import { previewProject } from "./lib/preview.mjs";
import { initProject } from "./lib/init.mjs";
import { updateSkills, listSkills, checkSkills, CORE_SKILLS, WORKFLOW_SKILLS } from "./lib/skills.mjs";
import { projectRender } from "./lib/project-render.mjs";

const pkg = JSON.parse(fs.readFileSync(path.join(PKG_ROOT, "package.json"), "utf8"));

const program = new Command();
program
  .name("html-marketing")
  .description("Write HTML. Render store creatives. Built for agents.")
  .version(pkg.version || "0.1.0");

program
  .command("doctor")
  .option("--json", "machine-readable output")
  .action(async (opts) => {
    process.exitCode = await runDoctor({ json: Boolean(opts.json) });
  });

program
  .command("sizes")
  .description("Look up export size presets. Never invent pixels.")
  .argument("[query]", "preset id, platform, or search text")
  .option("--platform <name>", "filter by platform")
  .option("--kind <kind>", "filter by kind (screenshot, pfp, post, thumbnail, ...)")
  .option("--json", "machine-readable")
  .option("--platforms", "list platform ids")
  .action((query, opts) => {
    if (opts.platforms) {
      process.stdout.write(`${platforms().join("\n")}\n`);
      return;
    }
    if (query && PRESETS[query]) {
      const p = getPreset(query);
      if (opts.json) {
        process.stdout.write(`${JSON.stringify(p, null, 2)}\n`);
        return;
      }
      process.stdout.write(`${formatPreset(p)}\n`);
      if (p.notes) process.stdout.write(`${p.notes}\n`);
      return;
    }
    const rows = filterPresets({
      platform: opts.platform,
      kind: opts.kind,
      query,
    });
    if (!rows.length) {
      process.stderr.write("No presets matched. Try --platforms or sizes --json\n");
      process.exitCode = 1;
      return;
    }
    if (opts.json) {
      process.stdout.write(`${JSON.stringify(rows, null, 2)}\n`);
      return;
    }
    for (const p of rows) process.stdout.write(`${formatPreset(p)}\n`);
  });

program
  .command("init")
  .argument("<name>", "project directory name")
  .option("--force", "overwrite existing files")
  .option("--non-interactive", "no prompts (default for agents)")
  .action((name, opts) => {
    initProject(name, opts);
  });

program
  .command("preview")
  .option("--port <port>", "port", "4173")
  .option("--file <file>", "start file", "screenshots/01-hook.html")
  .option("--no-open", "do not open a browser")
  .action(async (opts) => {
    await previewProject(process.cwd(), opts);
  });

program
  .command("lint")
  .description("Static checks: no em dashes, no emoji, canvas sizes")
  .action(() => {
    process.exitCode = printLint(lintProject(process.cwd()));
  });

program
  .command("check")
  .description("Lint plus headless Chromium runtime check")
  .action(async () => {
    process.exitCode = await checkProject(process.cwd());
  });

program
  .command("render")
  .description("Render a file or the project manifest")
  .argument("[html]", "HTML file. Omit to render manifest.yaml")
  .option("-o, --output <path>", "output file or directory")
  .option("--preset <id>", "size preset")
  .option("--width <px>", "width", (v) => Number(v))
  .option("--height <px>", "height", (v) => Number(v))
  .option("--scale <n>", "deviceScaleFactor 1-3", (v) => Number(v), 1)
  .option("--format <fmt>", "png or jpeg", "png")
  .action(async (html, opts) => {
    if (!html) {
      await projectRender(process.cwd(), opts.output);
      return;
    }
    if (!opts.output) throw new Error("Provide --output when rendering a single file");
    if (opts.preset) {
      await renderPreset(html, opts.output, opts.preset, {
        scale: opts.scale,
        type: opts.format,
      });
    } else {
      if (!opts.width || !opts.height) {
        throw new Error("Provide --preset or both --width and --height");
      }
      await renderImage(html, opts.output, {
        width: opts.width,
        height: opts.height,
        scale: opts.scale,
        type: opts.format,
      });
    }
    process.stdout.write(`Wrote ${path.resolve(opts.output)}\n`);
  });

program
  .command("video")
  .argument("<html>")
  .requiredOption("-o, --output <path>")
  .option("--preset <id>", "hd-landscape")
  .option("--width <px>", "width", (v) => Number(v))
  .option("--height <px>", "height", (v) => Number(v))
  .option("--duration <sec>", "seconds", (v) => Number(v), 4)
  .option("--fps <n>", "fps", (v) => Number(v), 30)
  .option("--scale <n>", "scale", (v) => Number(v), 1)
  .action(async (html, opts) => {
    const videoOpts = { duration: opts.duration, fps: opts.fps, scale: opts.scale };
    if (opts.width && opts.height) {
      await renderVideo(html, opts.output, { ...videoOpts, width: opts.width, height: opts.height });
    } else {
      await renderVideoPreset(html, opts.output, opts.preset || "hd-landscape", videoOpts);
    }
    process.stdout.write(`Wrote ${path.resolve(opts.output)}\n`);
  });

const skills = program.command("skills").description("Install and refresh agent skills");

skills
  .command("update")
  .argument("[name]", "workflow or domain skill. Omit for the core set")
  .action((name) => {
    updateSkills(name ? [name] : CORE_SKILLS);
  });

skills
  .command("list")
  .action(() => {
    process.stdout.write(`core: ${CORE_SKILLS.join(", ")}\n`);
    process.stdout.write(`workflows: ${WORKFLOW_SKILLS.join(", ")}\n`);
    process.stdout.write(`all: ${listSkills().join(", ")}\n`);
  });

skills
  .command("check")
  .description("Confirm core skills are installed in this project")
  .action(() => {
    process.exitCode = checkSkills(process.cwd());
  });

program
  .command("specs")
  .description("Print a design spec. Do not invent rules.")
  .argument("[name]", "SPECS, platforms, copy, or icons")
  .action((name) => {
    const root = path.join(PKG_ROOT, "specs");
    const id = (name || "SPECS").replace(/\.md$/i, "");
    const file = path.join(root, `${id}.md`);
    const alt = path.join(root, `${id.toUpperCase()}.md`);
    const hit = fs.existsSync(file) ? file : fs.existsSync(alt) ? alt : null;
    if (!hit) {
      const known = fs.readdirSync(root).filter((f) => f.endsWith(".md")).join(", ");
      throw new Error(`Unknown spec '${name}'. Known: ${known}`);
    }
    process.stdout.write(fs.readFileSync(hit, "utf8"));
  });

program
  .command("prompts")
  .argument("[name]", "prompt id to print")
  .action((name) => {
    const root = path.join(PKG_ROOT, "prompts");
    if (!name) {
      const files = [
        ...fs.readdirSync(root).filter((f) => f.endsWith(".md")),
        ...fs.readdirSync(path.join(root, "styles")).map((f) => `styles/${f}`),
      ];
      for (const f of files) process.stdout.write(`${f}\n`);
      return;
    }
    const candidates = [
      path.join(root, `${name}.md`),
      path.join(root, "styles", `${name}.md`),
    ];
    const hit = candidates.find((p) => fs.existsSync(p));
    if (!hit) throw new Error(`Unknown prompt '${name}'`);
    process.stdout.write(fs.readFileSync(hit, "utf8"));
  });

try {
  await program.parseAsync(process.argv);
} catch (err) {
  process.stderr.write(`${err.message || err}\n`);
  process.exitCode = 1;
}
