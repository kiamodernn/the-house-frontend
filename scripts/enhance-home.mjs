import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const file = resolve(process.cwd(), 'index.html');
let html = readFileSync(file, 'utf8');

const home = `<main id="main" class="home-v2">
  <section class="house-hero">
    <div class="house-hero-grid"></div>
    <div class="container house-hero-inner">
      <div class="house-hero-copy">
        <div class="hero-kicker"><span class="live-pip"></span> THE HOUSE / INTELLIGENCE FOR PLAYERS</div>
        <h1><span>PLAY</span><span>SMARTER.</span></h1>
        <p>Casino discovery, poker intelligence, slot culture and verified tipster performance — designed as one premium decision layer.</p>
        <div class="hero-cta-row"><a class="btn hero-primary" href="/casinos/">Enter the house <b>↗</b></a><a class="hero-text-link" href="/tips/">Open The Floor <span>→</span></a></div>
        <div class="hero-trust"><span>Independent structure</span><i></i><span>Data-led scoring</span><i></i><span>18+ responsible</span></div>
      </div>
      <div class="house-command" aria-label="House intelligence preview">
        <div class="command-top"><span>HOUSE INDEX</span><span class="command-live"><i></i>LIVE DEMO</span></div>
        <a class="command-card command-card-main" href="/casinos/">
          <div class="command-num">01</div><div class="command-meta"><small>OPERATOR PASSPORT</small><strong>NORTHSTAR</strong><span>Best for fast discovery</span></div>
          <div class="command-score"><b>9.4</b><span>/10</span></div>
          <div class="radar"><span></span><span></span><span></span><i></i></div>
        </a>
        <div class="command-split">
          <a class="command-card" href="/tips/"><div class="command-num">02</div><div class="command-meta"><small>THE FLOOR</small><strong>+18.4%</strong><span>Top 30D ROI</span></div><div class="spark spark-a"></div></a>
          <a class="command-card" href="/slots/"><div class="command-num">03</div><div class="command-meta"><small>SLOT FLOOR</small><strong>04 NEW</strong><span>Fresh drops</span></div><div class="slot-orb"><i></i></div></a>
        </div>
        <div class="command-ticker"><span>HOUSE SIGNAL</span><div><b>CHE</b> vs ARS · O2.5 <em>1.91</em></div><div>FAST PAYOUT <em>3 picks</em></div></div>
      </div>
    </div>
  </section>

  <section class="pulse-rail" aria-label="The Pulse">
    <div class="container pulse-rail-inner">
      <div class="pulse-label"><i></i><span>THE PULSE</span><small>LIVE SIGNAL</small></div>
      <a href="/tips/"><b>FOOTBALL</b><span>CHE — ARS</span><em>O2.5 · 1.91</em></a>
      <a href="/casinos/"><b>OPERATORS</b><span>Northstar leads</span><em>9.4 score</em></a>
      <a href="/slots/"><b>SLOT FLOOR</b><span>Neon Vault</span><em>Fresh drop</em></a>
      <a href="/coin/"><b>HOUSE COIN</b><span>Weekly reward</span><em>+240 HC</em></a>
    </div>
  </section>

  <section class="house-section operator-zone">
    <div class="container">
      <header class="editorial-head"><div><span class="section-no">01 / DISCOVER</span><h2>TOP OPERATORS</h2></div><p>Not a wall of affiliate banners. A fast decision system built around what actually matters.</p><a href="/casinos/">View all <span>↗</span></a></header>
      <div class="operator-stage">
        <a href="/casinos/stake-review/" class="operator-feature">
          <div class="op-top"><span class="rank">#01</span><span class="op-badge">EDITOR PICK</span></div>
          <div class="op-brand"><small>OPERATOR PASSPORT</small><strong>NORTHSTAR</strong><span>Crypto · Fast payout · Mobile-first</span></div>
          <div class="op-score"><strong>9.4</strong><span>/10 HOUSE SCORE</span></div>
          <div class="op-metrics"><div><span>PAYOUT</span><b>FAST</b></div><div><span>KYC</span><b>LIGHT</b></div><div><span>MOBILE</span><b>9.6</b></div><div><span>GAMES</span><b>2.1K</b></div></div>
          <div class="op-action">OPEN PASSPORT <span>→</span></div>
        </a>
        <div class="operator-stack">
          <a href="/casinos/stake-review/" class="operator-mini"><span class="rank">#02</span><div><small>POKER PICK</small><strong>ORBIT</strong><p>Poker-led lobby · clean onboarding</p></div><b class="mini-score">8.9</b><span class="mini-arrow">↗</span></a>
          <a href="/casinos/stake-review/" class="operator-mini"><span class="rank">#03</span><div><small>NEW SIGNAL</small><strong>VELVET ACE</strong><p>Slot-first · modern catalogue</p></div><b class="mini-score">8.7</b><span class="mini-arrow">↗</span></a>
          <div class="intent-panel"><span>FIND BY INTENT</span><div><a href="/casinos/">Fast payout</a><a href="/poker/">Poker</a><a href="/casinos/">Crypto</a><a href="/casinos/">High roller</a></div></div>
        </div>
      </div>
    </div>
  </section>

  <section class="house-section floor-zone">
    <div class="container">
      <header class="editorial-head light-head"><div><span class="section-no">02 / PERFORMANCE</span><h2>THE FLOOR</h2></div><p>Tipster performance presented like a trading desk: track record first, noise last.</p><a href="/tips/">Enter floor <span>↗</span></a></header>
      <div class="floor-terminal">
        <div class="floor-pick">
          <div class="floor-status"><span><i></i> LIVE PICK</span><time>21:00</time></div>
          <div class="match-line"><div><small>PREMIER LEAGUE</small><strong>CHELSEA <em>VS</em> ARSENAL</strong></div><span class="edge-chip">82% EDGE</span></div>
          <div class="market-line"><div><small>MARKET</small><b>OVER 2.5</b></div><div><small>ODDS</small><b>1.91</b></div><div><small>STAKE</small><b>1.0U</b></div></div>
          <div class="pick-owner"><span class="owner-avatar">JK</span><div><small>BY JAMES K.</small><b>+18.4% ROI / 30D</b></div><a href="/tipsters/james-k/">PROFILE →</a></div>
        </div>
        <aside class="tipster-board"><div class="board-title"><span>TOP TIPSTERS</span><small>30 DAY FORM</small></div>
          <a href="/tipsters/james-k/"><span>01</span><i>JK</i><div><b>James K.</b><small>Football</small></div><strong>+18.4%</strong></a>
          <a href="/tips/"><span>02</span><i>AR</i><div><b>Alex R.</b><small>Football</small></div><strong>+14.8%</strong></a>
          <a href="/tips/"><span>03</span><i>MT</i><div><b>Mark T.</b><small>Football</small></div><strong>+12.1%</strong></a>
          <div class="board-foot"><span>ROI</span><span>YIELD</span><span>WIN RATE</span><span>STREAK</span></div>
        </aside>
      </div>
    </div>
  </section>

  <section class="house-section slot-zone">
    <div class="container">
      <header class="editorial-head"><div><span class="section-no">03 / DISCOVERY</span><h2>SLOT FLOOR</h2></div><p>A visual discovery layer for new drops, mechanics and providers — not an endless thumbnail grid.</p><a href="/slots/">Open floor <span>↗</span></a></header>
      <div class="slot-strip">
        <a class="slot-feature-card" href="/slots/neon-vault/"><div class="slot-lines"></div><span class="slot-tag">FEATURED DROP</span><div class="slot-logo">NEON<br>VAULT</div><div class="slot-foot"><span>HOUSE STUDIO</span><b>EXPLORE ↗</b></div></a>
        <a class="slot-tile tile-orange" href="/slots/black-diamond/"><span>01</span><div class="gem"></div><strong>BLACK DIAMOND</strong><small>JACKPOT / TRENDING</small></a>
        <a class="slot-tile" href="/slots/after-hours/"><span>02</span><div class="moon"></div><strong>AFTER HOURS</strong><small>MEGAWAYS / FEATURED</small></a>
        <a class="slot-tile tile-grid" href="/slots/zero-hour/"><span>03</span><div class="zero">0</div><strong>ZERO HOUR</strong><small>NEW / HIGH RTP</small></a>
      </div>
    </div>
  </section>

  <section class="house-section ledger-zone">
    <div class="container">
      <header class="editorial-head"><div><span class="section-no">04 / EDITORIAL</span><h2>THE LEDGER</h2></div><p>Editorial built to feel like a premium magazine, with commercial context kept visible.</p><a href="/ledger/">Read all <span>↗</span></a></header>
      <div class="ledger-grid">
        <a href="/ledger/poker-moment/" class="ledger-lead"><div class="ledger-art"><span>THE CULTURE ISSUE</span><b>POKER<br>IS BACK.</b></div><div class="ledger-copy"><small>POKER / 8 MIN</small><h3>Why poker is having another moment</h3><p>Product, culture and community signals behind the renewed attention.</p></div></a>
        <div class="ledger-side"><a href="/ledger/casino-choice/"><span>GUIDE / 6 MIN</span><h3>How to compare casino offers without the noise</h3><b>READ →</b></a><a href="/ledger/tipster-proof/"><span>TIPSTERS / 7 MIN</span><h3>What a transparent tipster record should show</h3><b>READ →</b></a><div class="coin-banner"><span>HOUSE COIN</span><strong>REWARD THE SIGNAL.</strong><p>A future loyalty layer for meaningful actions, not engagement spam.</p><a href="/coin/">OPEN WALLET ↗</a></div></div>
      </div>
    </div>
  </section>

  <section class="closing-statement"><div class="container"><span>THE HOUSE</span><h2>LESS NOISE.<br><em>MORE SIGNAL.</em></h2><div><a class="btn" href="/casinos/">Start exploring ↗</a><p>Casino · Poker · Slots · Tipsters · Editorial</p></div></div></section>
</main>`;

html = html.replace('</head>', '<link rel="stylesheet" href="/src/styles/home-v2.css"></head>');
html = html.replace(/<main id="main">[\s\S]*?<\/main>/, home);
writeFileSync(file, html);
console.log('Enhanced Home V2.');
