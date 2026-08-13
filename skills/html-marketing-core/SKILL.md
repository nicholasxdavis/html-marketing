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

Link shared CSS. Studio is default:

```html
<link rel="stylesheet" href="../shared/tokens.css" />
<link rel="stylesheet" href="../shared/studio.css" />
```

Legacy Harbor still has `device.css` and `layouts.css`. Do not use them unless BRIEF names harbor or atlas.

## Icons

Phosphor Regular only. `currentColor`. 16 / 24 / 32 / 48. Zero or one on a promo tile.
`npx html-marketing specs icons` for the full rule. No emoji. No other packs.

```html
<i class="ph ph-magnifying-glass" aria-hidden="true"></i>
```

## Anatomy

Studio default: Field + Card + Proof.

- Field: dark wash tinted with brand accent
- Card: one rounded rectangle, centered, faint product-icon pattern
- Proof: remade product UI at native width (Chrome popup 340px, web panel ~480px, phone ~390px)
- Promo: accent-light field, white type, **no remade UI**

Never `transform: scale()` the product UI. If the frame is short, drop rows. Keep width.

## Manifest

`manifest.yaml` lists assets with `src`, `preset`, `format`, and optional `type: video`.

`npx html-marketing render` with no file argument renders the manifest.

## Video seek API

```js
window.__hm = { duration: 4, seek(t) { /* visual state at t seconds */ } };
```

No `Date.now()`, no unseeded `Math.random()`, no network fetches at render time except webfonts and Phosphor already linked.

## Forbidden

Emojis. Em dashes. Install CTAs. Mixing device styles in one set. Shrinking a full dashboard until it is unreadable. Inventing canvas sizes. Mixing icon packs. Pasting live screenshots into fake browser chrome. UI on 440x280 promo tiles.
