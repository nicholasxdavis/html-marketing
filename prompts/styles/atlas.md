# STYLE: Atlas

Dark green field. White type. Overflowing real device. Default for serious products.

## Use when

Productivity, privacy, utilities, developer tools, finance-adjacent, Chrome extensions.

## Tokens

```css
.field-atlas
--field: #0B3D2E
--field-2: #07281E
--type: #FFFFFF
--type-muted: rgba(255,255,255,0.72)
--accent: #1FA971
--bezel: #111111
--font-display: "Plus Jakarta Sans"
--font-body: Inter
```

## Composition

- Landscape: `layout-split` + `.browser` or `.phone`
- Portrait: `layout-caption-top` + `.phone`
- Caption: small uppercase brand, then 64-80px headline (landscape) or 72-96px (portrait)
- Support: 18-22px, 0.72 white
- Device overflows. Identical transform on every frame
- Field stays Atlas on all five frames, promo, and marquee

## Type

Headline weight 800, tracking -0.045em, line-height 0.98.
Brand: 13px, uppercase, letter-spacing 0.08em, muted.

## Motion (if video)

Fade and rise 16-28px. Accent rule grows to 180px. No bounce.

## Forbidden

Light gray backgrounds, extra cards, badges, purple, orange, illustrations, emoji, second headline, rainbow fields.

## Agent instruction

Rebuild or edit the HTML to match Atlas exactly. Keep shared CSS. Change only copy and inner UI. Export with html-marketing.
