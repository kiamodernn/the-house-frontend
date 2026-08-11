# The House Frontend V2

Premium casino/poker/slot/tipster editorial frontend designed to become a WordPress theme later.

## Architecture
- HTML-first multi-page frontend for crawlability and WordPress portability.
- Vite for fast development and production bundling.
- TypeScript for progressive-enhancement modules only.
- Shared CSS design tokens intended to map to WordPress `theme.json`.
- No client framework required for indexable website content.
- Dedicated Telegram Mini App can reuse tokens/domain contracts and use Preact where app-level state justifies it.

## Pages
Home, Casino hub, Casino passport demo, Poker hub, Slot floor, four slot detail demos, Tips, Tipster profile, Ledger, three article routes, House Coin, Notifications, Search, Profile, Responsible Gaming (20 generated routes total).

## Commands
```bash
npm install
npm run dev
npm run check
npm run build
```

`SITE_URL=https://your-domain.com npm run build` must be used before production so canonical URLs, sitemap and robots use the real domain.

## Current boundary
This is frontend-only. House Coin, notifications, operator facts, slot metadata and tipster metrics are demo UI data; no backend or factual gambling claims are connected yet.
