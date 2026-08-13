---
name: html-marketing
description: >
  Mandatory entry point: read this first for any request to make, create, edit,
  or render store screenshots, promo tiles, marquees, feature graphics, social
  posts, thumbnails, PFPs, or short marketing motion stings as HTML. Studio card
  is the default. Harbor split is off unless BRIEF names it.
---

# html-marketing entry point

html-marketing **renders marketing creatives from HTML**. A composition is a fixed-size HTML canvas. Export is Playwright Chromium (images) plus FFmpeg (video). The authoring contract lives in `/html-marketing-core`.

Default visual system is **Studio**. Harbor and Atlas are off unless BRIEF names them.

Do not invent sizes or icon packs. Look them up:

```bash
npx html-marketing sizes <platform-or-id>
npx html-marketing specs icons
```

## 0. Hard no

Do not ship Harbor/Atlas split posters (left caption + overflowing fake browser + pasted live screenshot). That look fails store quality.

Do not:

- Paste a busy live screenshot that already has header, chat, tooltips, or HUDs
- Stretch or `transform: scale()` the product UI
- Truncate UI labels
- Write slogans that could fit any app
- Use em dashes or emoji
- Write Download / Install / Try now
- Put remade UI on a 440x280 promo tile

## 1. Start from project state

| State | Action |
|-------|--------|
| Specific CLI op (lint, check, preview, render, doctor) | Do only that. Load `/html-marketing-cli`. |
| Specific edit to existing HTML | Make the edit. Do not re-run intake. |
| `BRIEF.md` exists | Read `workflow` and `style` (default `studio`). Execute that workflow. |
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
| Canvas, seek API, manifest, sizes, remade UI | `/html-marketing-core` |
| DESIGN.md, copy, two-second test | `/html-marketing-creative` |
| Device frames (optional). Proof is remade UI | `/html-marketing-device` |
| Paste-ready style recipes. Studio first | `/html-marketing-prompts` |
| init, lint, check, preview, render, doctor | `/html-marketing-cli` |

## 5. Studio anatomy

Screenshot / marquee: Field + Card + remade product UI at native width + copy that names real features.
Promo 440x280: accent-light field, white type, logo, **no remade UI**.

## 6. Production loop

1. Look up the preset. Set `body` and `.canvas` to that exact size.
2. Paste `prompts/styles/studio.md` unless BRIEF names another style.
3. Remake product UI from source. Native width. `flex: 0 0 auto`. No scale.
4. Phosphor Regular if an icon is needed. No emoji. No em dashes.
5. `npx html-marketing lint` then `check` then `preview`.
6. `npx html-marketing render` after approval.
7. Open the PNGs. RSI until the two-second test passes, max 4 passes.
