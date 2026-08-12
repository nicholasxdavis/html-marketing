# CREDITS

Reference implementations studied locally. html-marketing reimplements a lean
Node pipeline; it does not redistribute those packages as a dependency.

## Hyperframes

- Repo: https://github.com/heygen-com/hyperframes
- License: Apache-2.0
- What we take: HTML-native composition model, seekable animation contract,
  agent-friendly authoring loop, deterministic Chromium + FFmpeg rendering ideas,
  design-for-camera thinking.

## html-video

- Repo: https://github.com/nexu-io/html-video
- License: Apache-2.0
- What we take: project/template manifest thinking, multi-asset storyboard workflow,
  local-first agent orchestration patterns, template metadata shape.

## Browsershot

- Repo: https://github.com/spatie/browsershot
- License: MIT
- What we take: fixed window size + deviceScaleFactor screenshot semantics,
  HTML-or-file input, clip/full-page/type options. Implemented here with
  Playwright (no PHP runtime required).

## Store screenshot kits

- https://github.com/dotnetdreamer/open-screenshot-generator (MIT)
  Artboard model: field + text + device frame + exact store sizes.
  Template JSON as a saved set of frames. 3D/tilt as an optional pose.
- https://github.com/shitamori1272/AppScreenshotKit
  Current Apple size classes, especially iPhone 6.9 (1320x2868) and device color maps.
- https://github.com/yisheng/AppScreenshot
  Classic title-band + device overlay HTML, then headless capture.
- https://github.com/6ag/AppScreenshots
  Template-cell + paster composition for styled store frames.

## Prompt craft

Prompt files under `prompts/` follow the style-explorer pattern: same content,
swapped tokens, numbers over adjectives, a forbidden list, copy-paste recipes.
See https://www.designprompts.dev/ for the general method.

## Icons

[Phosphor Icons](https://phosphoricons.com) Regular, MIT. Linked via
`templates/shared/icons.css`. No other icon pack is in the design system.

## Creative research

Store and social rules now live in `specs/`: outcome-led copy, five-beat story,
cognitive load, platform policy, and the size catalog in `data/sizes.json`.
