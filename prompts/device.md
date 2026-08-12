# DEVICE

Pick one frame style for the whole set. Do not mix.

## Styles

| Class | Look | When |
|-------|------|------|
| `.phone` (default, real) | Dark bezel, island, hard shadow | Most iPhone / Play sets |
| `.phone.clay` | Matte beige bezel, soft shadow | Calm, wellness, analog brands |
| `.phone.outline` | 2px stroke, no fill | Graphic, poster-like sets |
| `.phone.frameless` | UI only, large radius | When the UI is the hero |
| `.browser` | Traffic lights + omnibox | Chrome extensions, Mac, web apps |

## Placement

Portrait: device centered, width 70-82% of canvas, overflow the bottom.
Landscape: device on the right, overflow right and bottom. Same translate on every frame.

Optional tilt: `.tilt-left` or `.tilt-right` at 8deg. If you tilt one frame, tilt all, same angle.

## Inner screen

The product UI lives in `.phone-screen` or `.browser-body`.
Crop to the important interaction. Enlarge. Do not show a tiny full dashboard.

## Forbidden

- Mixing phone and browser in one 5-frame set unless the product truly spans both, and even then keep one primary
- Changing bezel color per frame
- Fake hardware logos
- Notch/island on a browser
