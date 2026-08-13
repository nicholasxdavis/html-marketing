---
name: html-marketing-device
description: >
  Proof is remade product UI at native size. Phones and browsers are optional,
  not default. Legacy frames stay available if BRIEF names them.
---

# Device

Studio default: **no browser chrome, no phone frame.** The remade product UI is the device.

| Proof | When |
|---|---|
| Remade popup / panel at native width | Chrome extensions, most utilities |
| Remade app screen, cropped large | Web / SaaS |
| Remade phone UI, frameless unless needed | iOS / Play |
| Logo + type only | Promo 440x280 |

## If BRIEF names a frame

Pick one style for the whole set.

| Class | When |
|-------|------|
| none (Studio card) | Default |
| `.product-ui.phone` | Portrait stores when the UI is the hero |
| `.phone` / `.browser` | Only if BRIEF asks. Never around a busy live screenshot |

Do not mix phone and browser in one 5-frame set unless the product truly spans both.

Chrome popup: **340px**. Web panel: ~480px. Phone: ~390px.
`transform: scale()` is forbidden.
