# Icons: Phosphor only

Use [Phosphor Icons](https://phosphoricons.com) Regular weight for every icon in html-marketing frames.

Never emoji. Never Material. Never Lucide. Never Heroicons. Never SF Symbols. Never handwritten SVG marks that try to look like a set.

## How

Link the shared sheet after tokens:

```html
<link rel="stylesheet" href="../../templates/shared/icons.css" />
```

Then:

```html
<i class="ph ph-magnifying-glass" aria-hidden="true"></i>
<i class="ph ph-lg ph-lock-simple" aria-hidden="true"></i>
```

`icons.css` loads Phosphor Regular from unpkg and sets 24px default, `currentColor`.

## Sizes

| Class | Size | Use |
|-------|------|-----|
| `.ph` / `.icon` | 24px | UI chrome, inline with Inter |
| `.ph-sm` | 16px | Dense product UI only |
| `.ph-lg` | 32px | Promo callouts |
| `.ph-xl` | 48px | Tile / PFP / empty states |

Scale by those steps only. Do not invent 27px icons.

## Rules

- One weight: Regular. Do not mix Bold / Fill / Duotone in a set.
- Color is `currentColor`. Inherit `--type` or `--accent`. Never a third icon hue.
- One icon per idea. A frame may use zero. Promo tiles may use one.
- Align to text cap-height. Give 8px air.
- Prefer names that read at a glance: `ph-magnifying-glass`, `ph-lock-simple`, `ph-lightning`, `ph-folder-simple`, `ph-check`, `ph-globe`.
- If no Phosphor name fits, drop the icon. Do not draw a custom one.

## Where icons belong

| Surface | Icons |
|---------|-------|
| Store screenshots | Inside the product UI, or one small caption mark |
| Promo tile / marquee | Zero or one |
| PFP | None, or the brand mark as HTML/CSS |
| YouTube thumb | Usually none. Type + face/UI win |
| Social feed | Optional one, never a row of six |

Icons are recognition, not decoration. If it does not earn its cost, delete it.
