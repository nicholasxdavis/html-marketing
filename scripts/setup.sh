#!/usr/bin/env sh
set -eu
ROOT=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
cd "$ROOT"

echo "==> npm install"
npm install

echo "==> Playwright Chromium"
npx playwright install chromium

echo ""
echo "Setup complete."
echo "  npx html-marketing doctor"
echo "  npx html-marketing skills update"
echo "  npx html-marketing render --output output/demo projects/demo-extension"
echo ""
echo "FFmpeg is required for video export. Install it for your OS, then reopen the terminal."
