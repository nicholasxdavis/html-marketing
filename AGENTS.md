# html-marketing

Write HTML. Render store creatives. Built for agents.

## Skills

```bash
npx html-marketing skills update
npx skills add nicholasxdavis/html-marketing --full-depth
```

Read `/html-marketing` first. It routes:

- `/store-listing` - App Store, Play, or Chrome Web Store screenshot set
- `/promo-graphics` - tile, marquee, feature graphic
- `/social-post` - Instagram, Facebook, Reddit, X, YouTube thumb, PFP, OG
- `/motion-sting` - short unnarrated MP4
- `/product-launch-set` - full campaign from a brief

Do not invent sizes or icon packs:

```bash
npx html-marketing sizes
npx html-marketing sizes youtube
npx html-marketing specs platforms
npx html-marketing specs icons
```

Phosphor Icons Regular only.

## Loop

```bash
npx html-marketing init my-listing --non-interactive
npx html-marketing lint
npx html-marketing check
npx html-marketing preview
npx html-marketing render
```

Both lint and check must pass before considering work complete.

## Conventions

- Node.js 22+. npm. FFmpeg on PATH for video.
- No PowerShell scripts. `npx html-marketing` on macOS, Linux, and Windows.
- No emojis. No em dashes.
- Fixed-size HTML. Video exposes `window.__hm.seek(t)`.
- One style prompt per set. Look up presets. Never guess canvas pixels.
