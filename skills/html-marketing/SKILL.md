---
name: html-marketing
description: >
  Mandatory entry point: read this first for any request to make, create, edit,
  or render store screenshots, promo tiles, marquees, feature graphics, social
  posts, thumbnails, PFPs, or short marketing motion stings as HTML. Routes to
  a workflow, then domain skills.
---

# html-marketing entry point

html-marketing **renders marketing creatives from HTML**. A composition is a fixed-size HTML canvas. Export is Playwright Chromium (images) plus FFmpeg (video). The authoring contract lives in `/html-marketing-core`.

Do not invent sizes or icon packs. Look them up:

```bash
npx html-marketing sizes <platform-or-id>
npx html-marketing specs icons
```

## 1. Start from project state

| State | Action |
|-------|--------|
| Specific CLI op (lint, check, preview, render, doctor) | Do only that. Load `/html-marketing-cli`. |
| Specific edit to existing HTML | Make the edit. Do not re-run intake. |
| `BRIEF.md` exists | Read `workflow` and `style`. Execute that workflow. |
| `manifest.yaml` exists, no brief | Resume from the manifest. Infer the workflow from assets. |
| Fresh creation | Confirm product, platform, and style, write `BRIEF.md`, then route. |

## 2. Route fresh creation

| Priority | Request | Workflow |
|----------|---------|----------|
| 1 | Promo tile, marquee, feature graphic, icon | `/promo-graphics` |
| 2 | Short unnarrated motion sting or logo hit (under ~10s) | `/motion-sting` |
| 3 | Full launch set from a brief or URL | `/product-launch-set` |
| 4 | Instagram, Facebook, Reddit, X, YouTube thumb, PFP, OG | `/social-post` |
| 5 | App Store, Play, or Chrome Web Store screenshot set | `/store-listing` |

## 3. Install the workflow

```bash
npx html-marketing skills update <workflow-name>
```

Bare name, no leading `/`. That refreshes core **and** installs the workflow. Core only:

```bash
npx html-marketing skills update
```

## 4. Domain skills (load on demand)

| Need | Skill |
|------|-------|
| Canvas, seek API, manifest, sizes, Phosphor | `/html-marketing-core` |
| DESIGN.md, copy, five beats | `/html-marketing-creative` |
| Device frames and locked layouts | `/html-marketing-device` |
| Paste-ready style recipes | `/html-marketing-prompts` |
| init, lint, check, preview, render, doctor | `/html-marketing-cli` |

## 5. Production loop

1. Look up the preset. Set `body` and `.canvas` to that exact size.
2. Paste one style prompt. Do not invent a look.
3. Write valid HTML. Field + Caption + Device. Geometry locked across the set.
4. Phosphor Regular if an icon is needed. No emoji. No em dashes.
5. `npx html-marketing lint` then `check` then `preview`.
6. `npx html-marketing render` after approval.
