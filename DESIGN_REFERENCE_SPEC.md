# THE HOUSE — Canonical Visual Reference

This file is the implementation contract for the approved visual direction. Do not reinterpret it into a generic casino template.

## 1. Visual personality
- Dark editorial intelligence, not dark-gold casino.
- Premium / sharp / young / data-led.
- Black is the canvas; acid-lime is the decisive accent; warm orange is reserved for secondary signal states.
- No decorative glassmorphism everywhere. Use subtle depth only where information hierarchy benefits.
- No chip/card/crown casino clichés as the primary visual language.

## 2. Reference header measurements
Source reference image: 1536 × 1024.
- Black desktop stage with a subtle hairline frame and large rounded top corners.
- Brand visible approximately x 47–142, y 21–48 in the source artboard.
- Primary navigation baseline around y 35; compact uppercase labels.
- Reference nav order: CASINO / POKER / TIPS / LEDGER / RANKINGS / GUIDES / NEWS.
- Utility order: Search / Notifications / EXPLORE.
- Explore is the strongest acid-lime CTA.
- Desktop header target height: 70–76px.
- Container target: 1412px max, centred.
- Header should feel editorial and expensive, not app-dashboard generic.

## 3. Core palette
- Void: #050605
- Carbon: #090B09
- Graphite: #111411
- Bone: #F3F0E8
- Acid: #D7FF3F
- Acid-dark: #AFCF25
- Signal: #FF5A36
- Muted text: #8E968E
- Hairline: rgba(243,240,232,.10)

## 4. Typography
- Display: very bold, condensed-feeling system sans; uppercase; tight tracking.
- Data labels: mono/system-mono uppercase, 10–12px.
- Body: clean neutral sans, 15–18px desktop.
- Hero display should dominate the first viewport.

## 5. Homepage hierarchy
### Header
Reference-accurate compact navigation and Explore CTA.

### Hero
- Left: WELCOME / PLAY SMARTER. statement, concise explanatory copy, two CTAs.
- Right: layered skewed editorial cards, not a rectangular dashboard.
- Card 1: Operator Passport / operator score.
- Card 2: The Floor / tipster signal.
- Card 3: Story / Poker or Ledger photographic card.
- Floating House Edge score/ring.
- Depth comes from rotation, overlap, shadow and restrained outlines.

### The Pulse
- Thin horizontal signal rail directly after Hero.
- Categories: Football, Operators, Slot Floor, House Coin.
- Dense, small typography and live-state dot.

### Top Operators
- One large featured Operator Passport.
- Two ranked compact alternatives.
- Intent chips.
- Head-to-Head comparison strip.
- Decision criteria visible without opening detail page.

### The Floor
- Sports trading terminal feel.
- Match, market, odds, stake, edge/confidence.
- Tipster identity and transparent 30-day metric.
- Adjacent ranked Tipster leaderboard.

### Slot Drops
- Cinematic visual rail.
- 1 feature poster + 3 distinct visual tiles.
- Do not use repetitive rectangular product cards.

### Poker
- Large photographic editorial block plus room ranking panel.
- Poker is a first-class product area, not a Casino sub-card.

### House Coin + Notifications
- Coin balance/reward utility.
- Notification stack and interactive notification centre.
- Member functionality should feel integrated into the publication.

### The Ledger
- Magazine hierarchy: one large lead story, two secondary stories, editorial statement.
- Photography has strong crop and typographic overlay.

### Telegram Mini App
- Native-feeling phone mockup on desktop presentation.
- On actual mobile viewport, do not show a fake phone frame; show the mobile UI itself.
- Bottom navigation, safe-area spacing, compact cards.

### Responsible Gaming
- Quiet but visible final band; not buried in tiny footer text.

## 6. Mobile contract
- 390px is a primary design target, not an afterthought.
- Header becomes compact brand + search + notifications/coin.
- Hero cards become horizontally scrollable/stacked with partial next-card reveal.
- Pulse is horizontal scroll.
- Operator, Floor, Slots and Ledger become intentionally composed one-column layouts.
- Bottom app navigation stays available on mobile.
- Touch target minimum ~44px.
- No horizontal overflow at 390px.

## 7. SEO/performance contract
- Exactly one visible H1 per route.
- Crawlable native anchor links.
- Critical editorial content remains HTML-first.
- Images must have explicit dimensions and useful alt text.
- Hero image may use fetchpriority=high; below-fold imagery uses lazy loading.
- Demo remains noindex through DEMO_NOINDEX=1.
- Final production replaces remote demo imagery with local/CDN AVIF/WebP and responsive srcsets.

## 8. Anti-patterns — explicitly forbidden
- Generic three-column card grids as the main visual system.
- Excessive blank black space.
- Gold casino palette.
- Repetitive rounded glass cards.
- Decorative casino icons everywhere.
- Large areas that look like unfinished wireframes.
- Desktop layout simply squeezed into mobile.

This spec is the source of truth until the product owner explicitly changes it.
