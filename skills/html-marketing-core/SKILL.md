---
name: html-marketing-core
description: >
  Composition contract for html-marketing: fixed canvas sizes, shared CSS,
  manifest.yaml, window.__hm seek API, determinism, and export rules.
---

# Core contract

## Canvas

Never guess pixels. Look up the preset, then set both `body` and `.canvas`:

```bash
npx html-marketing sizes <id>
```

```css
body, .canvas { width: 1280px; height: 800px; }
```

Link shared CSS:

```html
<link rel="stylesheet" href="../shared/tokens.css" />
<link rel="stylesheet" href="../shared/device.css" />
<link rel="stylesheet" href="../shared/layouts.css" />
<link rel="stylesheet" href="../shared/icons.css" />
```

## Icons

Phosphor Regular only. `currentColor`. 16 / 24 / 32 / 48. Zero or one on a promo tile.
`npx html-marketing specs icons` for the full rule. No emoji. No other packs.

```html
<i class="ph ph-magnifying-glass" aria-hidden="true"></i>
```

## Anatomy

Every frame is Field + Caption + Device.

- Field: `.field-atlas` (or the style in BRIEF.md)
- Caption: `.brand`, `.headline`, `.support`
- Device: `.browser` or `.phone` inside `.device-stage`
- Layout: `.layout-split`, `.layout-caption-top`, `.layout-tile`, `.layout-marquee`, `.layout-feed`, `.layout-thumb`

Lock device transform, size, and field across the set. Change only copy and inner UI.

## Manifest

`manifest.yaml` lists assets with `src`, `preset`, `format`, and optional `type: video`.

`npx html-marketing render` with no file argument renders the manifest.

## Video seek API

```js
window.__hm = { duration: 4, seek(t) { /* visual state at t seconds */ } };
```

No `Date.now()`, no unseeded `Math.random()`, no network fetches at render time except webfonts and Phosphor already linked.

## Forbidden

Emojis. Em dashes. Install CTAs. Mixing device styles in one set. Shrinking a full dashboard until it is unreadable. Inventing canvas sizes. Mixing icon packs.
