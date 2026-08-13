# STYLE: Harbor

Off by default. Use `prompts/styles/studio.md` unless BRIEF explicitly names harbor.

Landscape split for Chrome Web Store and Mac listings. Caption column. Large browser.

## Use when

Only if BRIEF names harbor. Studio is the default for Chrome extensions, web apps, and Mac listings.

## Tokens

Same as Atlas unless the brief names Meridian or Clay.
Default field: `.field-atlas`

## Composition

- Class: `layout-split` on 1280x800
- Class: `layout-marquee` on 1400x560
- Class: `layout-tile` on 440x280 (no browser)
- Device: `.browser` width 720 height 520 on screenshots
- Browser transform: translate(48px, 36px) on every screenshot. Do not nudge.

## Caption column

Padding 72px 48px 72px 72px.
Gap 18px.
Headline 56-72px.
Max width 520px.

## Inner UI

Command palette, sidebar, or the one interaction that proves the headline.
Row height 44-52px. Active row uses accent-soft.

## Forbidden

Phone mockups on a Chrome-only listing unless the product is mobile.
Tiny browser centered with padding on all sides.
Changing browser width between frames.
