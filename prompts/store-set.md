# STORE SET

You are authoring a complete store listing set as HTML canvases, then exporting with html-marketing.

Do not invent a visual system. Load `prompts/styles/studio.md` unless BRIEF names another style.

## Inputs you must collect

- Product name
- One sentence outcome that names real features
- Platform: chrome-web-store | app-store | google-play
- Path to real UI source (packed/, popup HTML, app source)
- Five beat headlines (hook, mechanism, differentiator, benefit, trust)
- One support line per beat, max 12 words
- Accent and accent-light hex

## Locked structure

Studio: Field + Card + remade product UI at native width.

- Chrome / web: remade popup or panel. 340px or ~480px. No fake browser.
- iPhone / Play portrait: remade screen, 390px, frameless unless BRIEF asks
- Promo 440x280: brand tile. No remade UI

Keep proof width identical on every screenshot in the set. Drop rows on the marquee if needed.

## Files to produce

Match `manifest.yaml`.

Typical Chrome set:

1. `screenshots/01-hook.html` 1280x800
2. `screenshots/02-mechanism.html`
3. `screenshots/03-differentiator.html`
4. `screenshots/04-benefit.html`
5. `screenshots/05-trust.html`
6. `promo/promo.html` 440x280
7. `promo/marquee.html` 1400x560

Typical iPhone set (same copy, Studio portrait card, preset `ios-6-9`):

1. Five portrait frames at 1320x2868

## Hard rules

- No emojis
- No em dashes
- No install CTAs
- No `transform: scale()` on product UI
- No live screenshot dumps
- Link `shared/tokens.css` and `shared/studio.css`
- Set `body` and `.canvas` to the exact preset size
- Inner UI must stay large enough to read

## After HTML

```bash
npx html-marketing lint
npx html-marketing check
npx html-marketing render
```

Then RSI. Two-second test on every PNG.
