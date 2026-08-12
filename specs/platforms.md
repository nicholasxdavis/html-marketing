# Platform rules

Sizes live in `data/sizes.json`. This file is the policy. Do not guess.

## Chrome Web Store

| Asset | Preset | Notes |
|-------|--------|-------|
| Screenshots | `cws-screenshot` 1280x800 | Max 5. Full bleed. Square corners. No padding. Real UI. |
| Small shot | `cws-screenshot-sm` 640x400 | Allowed, not preferred. |
| Promo tile | `cws-promo-tile` 440x280 | Required. Not a raw screenshot. No transparency. |
| Marquee | `cws-marquee` 1400x560 | Optional. Brand-first. Uncluttered. |
| Icon | `cws-icon` 128x128 | Listing icon. |

Screenshots and promo graphics are different jobs. Shots prove the product. Promo attracts at reduced size.

Saturated brand field. Avoid empty white that melts into the store chrome.

## Apple App Store

| Asset | Preset | Notes |
|-------|--------|-------|
| iPhone base | `ios-6-9` 1320x2868 | Required. Apple scales down from this. |
| iPad | `ios-ipad-13` 2064x2752 | Required if the app runs on iPad. |
| Icon | `ios-icon` 1024x1024 | No transparency. Do not pre-round. |
| Preview | `ios-preview-69` 886x1920 | 15-30s, 30fps, H.264. |

Up to 10 screenshots. First 1-3 can appear in search. Show actual app UI. If Dark Mode exists, include one dark frame.

## Google Play

| Asset | Preset | Notes |
|-------|--------|-------|
| Phone | `play-phone` 1080x1920 | 2 to 8 shots. Real in-app experience. |
| Feature | `play-feature` 1024x500 | Required. No transparency. |
| Icon | `play-icon` 512x512 | High-res source. |
| Tablet | `play-tablet-10` | If you claim tablet. |

Do not wrap Play shots in fake device frames. Keep overlay text under ~20%. No "Download now".

## YouTube

| Asset | Preset |
|-------|--------|
| Thumbnail | `yt-thumb` 1280x720 |
| Channel art | `yt-banner` 2560x1440, keep type in 1546x423 |
| PFP | `yt-pfp` 800x800 |
| Shorts cover | `yt-shorts` 1080x1920 |
| Community | `yt-community` 1200x1200 |

Thumbnails downsample hard. Huge type. One face or one UI. Leave the bottom-right clear for the duration badge.

## X (Twitter)

| Asset | Preset |
|-------|--------|
| Landscape post | `x-post` 1600x900 |
| Square | `x-post-square` 1080x1080 |
| Portrait | `x-post-portrait` 1080x1350 |
| PFP | `x-pfp` 400x400 |
| Header | `x-cover` 1500x500 |
| Link card | `x-card` 1200x630 |

## Instagram

| Asset | Preset |
|-------|--------|
| Feed (preferred) | `ig-post` 1080x1350 |
| Square | `ig-post-square` 1080x1080 |
| Story / Reel | `ig-story` 1080x1920, 14% safe top and bottom |
| PFP | `ig-pfp` 320x320, circle crop |

## Facebook

| Asset | Preset |
|-------|--------|
| Feed | `fb-post` 1080x1350 |
| Link | `fb-post-link` 1200x630 |
| Cover | `fb-cover` 851x315 |
| Story | `fb-story` 1080x1920 |

## Reddit

| Asset | Preset |
|-------|--------|
| Post | `reddit-post` 1080x1350 |
| Link-style | `reddit-post-og` 1200x628 |
| Avatar | `reddit-pfp` 256x256 |
| Banner | `reddit-banner` 1920x384 |

## LinkedIn, TikTok, Threads, Pinterest, Snapchat

Use `li-*`, `tiktok-*`, `threads-*`, `pin-*`, `snap-*` presets. Do not invent pixels.

## Generic

| Job | Preset |
|-----|--------|
| Open Graph | `og-card` 1200x630 |
| Avatar source | `pfp-1024` then scale down |
| Blog thumb | `thumb-blog` 1200x630 |
| HD video still | `hd-landscape` 1920x1080 |
