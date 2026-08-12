# STORE SET

You are authoring a complete store listing set as HTML canvases, then exporting with html-marketing.

Do not invent a visual system. Load one style prompt from `prompts/styles/` and obey it.

## Inputs you must collect

- Product name
- One sentence outcome
- Platform: chrome-web-store | app-store | google-play
- True product UI (what the inner screen actually shows)
- Five beat headlines (hook, mechanism, differentiator, benefit, trust)
- One support line per beat, max 12 words

## Locked structure

Each frame = Field + Caption + Device.

Use the layout named by the style prompt:

- Chrome / Mac: `layout-split` or `layout-marquee`
- iPhone / Play portrait: `layout-caption-top`
- Promo 440x280: `layout-tile` (no device)

Keep device x/y/width/height identical on every screenshot in the set.

## Files to produce

Match `projects/<name>/manifest.yaml`.

Typical Chrome set:

1. `screenshots/01-hook.html` 1280x800
2. `screenshots/02-mechanism.html`
3. `screenshots/03-differentiator.html`
4. `screenshots/04-benefit.html`
5. `screenshots/05-trust.html`
6. `promo/promo.html` 440x280
7. `promo/marquee.html` 1400x560

Typical iPhone set (same copy, `layout-caption-top`, preset `ios-6-9`):

1. Five portrait frames at 1320x2868

## Hard rules

- No emojis
- No em dashes
- No install CTAs
- No second accent color
- No cards in the caption column
- No fake UI
- Link `../../../templates/shared/tokens.css`, `device.css`, `layouts.css`
- Set `body` and `.canvas` to the exact preset size
- Inner UI must stay large enough to read

## After HTML

```text
html-marketing project-render projects/<name>
```

Then check the two-second test on the first three frames.
