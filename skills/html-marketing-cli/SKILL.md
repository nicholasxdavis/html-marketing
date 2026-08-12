---
name: html-marketing-cli
description: >
  Use the html-marketing CLI loop: init, preview, lint, check, render, video,
  doctor, sizes, specs, prompts, skills update. Requires Node.js 22+ and
  FFmpeg for video.
---

# html-marketing CLI

Same loop as Hyperframes, for marketing canvases:

```bash
npx html-marketing init my-listing --non-interactive
cd my-listing
npx html-marketing doctor
npx html-marketing lint
npx html-marketing check
npx html-marketing preview
npx html-marketing render
```

| Command | Purpose |
|---------|---------|
| `init <name>` | Scaffold a Chrome listing project |
| `doctor` | Node, FFmpeg, Playwright Chromium |
| `sizes [query]` | Exact presets. `--platform`, `--kind`, `--json` |
| `specs [name]` | Print platforms, copy, or icons |
| `lint` | Em dashes, emoji, canvas sizes |
| `check` | Lint plus headless runtime errors |
| `preview` | Local static server |
| `render` | Manifest or single HTML to PNG/JPEG |
| `video` | Seekable HTML to MP4 |
| `prompts [name]` | Print a style recipe |
| `skills update [name]` | Refresh core; optionally install one workflow |
| `skills check` | Confirm core skills are present |

Never invent a canvas size. Run `sizes` first.

`doctor --json` prints `{ ok, rows }`. Gate on `ok`.

```bash
npx playwright install chromium
```

Do not use PowerShell-only scripts. This CLI is the only setup path on macOS, Linux, and Windows.
