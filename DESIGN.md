# DESIGN.md - html-marketing

Design system for store and social creatives. Written for listing surfaces, not websites.

Do not invent sizes or icon packs.

```bash
npx html-marketing sizes
npx html-marketing specs
npx html-marketing specs icons
```

## Intent

Professional. Simple. Minimal. Clean. Fixed canvas. Thumbnail-aware.
No emojis. No em dashes. Quiet confidence. One campaign, not five posters.

A store creative is a small advertisement whose proof is the product UI.

Mental model:

> Attention -> Understanding -> Belief -> Desire -> Install

## Do not invent a look

Open `prompts/` first. Pick one style prompt. Follow it.
Run `html-marketing prompts` to list them.
If you need a new look, add a new prompt file. Do not freestyle.

## Anatomy of a store frame

Studio default. Every screenshot is:

1. **Field** - dark wash tinted with brand accent.
2. **Card** - one rounded rectangle, centered, faint product-icon pattern.
3. **Proof** - remade product UI at native width. Not a pasted live screenshot.

Promo tiles are brand color + type. No remade UI.

Harbor split (caption left + fake browser) is off unless BRIEF names it.

Lock these across the set:

- Field color family
- Type family and headline weight
- Device style (real, clay, outline, or frameless)
- Device size, position, and crop
- Caption block position

Only the words and the inner UI change from frame to frame.

## Layouts

| Layout | Canvas | Use |
|--------|--------|-----|
| `layout-split` | 1280x800, 1400x560, Mac | Caption left. Device overflows right. |
| `layout-caption-top` | 1320x2868 and other portraits | Caption top. Device covers the rest, often cropped at the bottom. |
| `layout-tile` | 440x280 | Caption only. No device. |
| `layout-marquee` | 1400x560 | Wider split. |
| `layout-feed` | ig-post, reddit, facebook | One idea. 8% inset. |
| `layout-thumb` | yt-thumb | Huge type. Subject left. Bottom-right clear. |
| `layout-pfp` | avatars | Mark only. Circle-safe. |

Portrait rule of thumb (phone store):

- Caption lives in the top 22-28%
- Device fills the rest and may overflow the bottom
- Headline 3 to 7 words, centered or left, high contrast
- Device width about 70-82% of canvas

Landscape rule of thumb (Chrome / Mac):

- Caption column about 40-46%
- Device overflows the right and bottom
- Same device coordinates on every frame

Device fit:

- **Contain** if the whole device must be visible
- **Cover / overflow** if you want scale and crop (usually better)

Device styles:

- **Real** - dark or light bezel, island, deep shadow
- **Clay** - matte neutral bezel, softer shadow
- **Outline** - 2px stroke, no fill
- **Frameless** - UI only, large radius, still clipped

Do not mix styles inside one set.

## Typography

| Role | Family | Use |
|------|--------|-----|
| Display | Plus Jakarta Sans 800 | Headlines |
| Body / UI | Inter 400-600 | Support lines and product UI |

Rules:

- Headline survives a 50% thumbnail. If it fails, enlarge or cut words.
- 3 to 7 words for the hook. One support sentence.
- One hierarchy: Headline -> Device -> Support.
- Never thin gray on a mid gray field.
- Auto-scale the title to the caption box. Do not add a second headline.

## Color

One field. One type color. One accent, used once.

Default Atlas:

| Token | Value |
|-------|-------|
| `--field` | `#0B3D2E` |
| `--field-2` | `#07281E` |
| `--type` | `#FFFFFF` |
| `--type-muted` | `rgba(255,255,255,0.72)` |
| `--accent` | `#1FA971` |
| `--bezel` | `#111111` |

Connected sets keep the same field. Do not rainbow the five frames.
A 4-8% luminance shift is allowed. A new hue is not.

Forbidden: purple-on-white AI defaults, cream + terracotta, newspaper grids,
neon stacks, glassmorphism, emoji, pill clusters, fake 5-star rows.

## Icons

Phosphor Icons Regular only. Link `templates/shared/icons.css`.
24 / 32 / 48 px. `currentColor`. Zero or one on a promo tile.
See `specs/icons.md`.

## Copy

Formula:

> Desired outcome + short supporting line + product proof

Weak: Advanced Analytics
Better: Know what is actually working
Stronger: See what your customers do. + real UI

Story for a set of 5:

1. Hook - why should I care
2. Mechanism - how it solves it
3. Differentiator - why this is better
4. Secondary benefit
5. Trust - only true claims

Never write Download now, Install now, or Try now. The store already has the button.

## Platform notes

Do not memorize. Run `html-marketing sizes` and read `specs/platforms.md`.

- Chrome screenshots: 1280x800, full bleed, square corners, no padding. Max 5.
- Promo tile: 440x280, no transparency, caption only.
- Marquee: 1400x560, no transparency, uncluttered.
- iPhone required base: 1320x2868 (6.9 class). Apple scales down from this.
- iPad required if the app runs on iPad: 2064x2752.
- Play feature graphic: 1024x500, required, no transparency.
- App preview video 6.9 class: 886x1920, 15-30s, 30fps, H.264.
- YouTube thumb: 1280x720. IG/FB/Reddit feed: 1080x1350. Stories: 1080x1920.

## Quality bar

Two-second test: what does it do, who is it for, what is the benefit.
If the viewer cannot answer, cut elements. Do not add them.
One dominant thing. One supporting thing. Everything else stays quiet.
