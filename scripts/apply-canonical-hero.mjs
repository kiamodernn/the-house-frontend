import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const file = resolve(process.cwd(), 'index.html');
let html = readFileSync(file, 'utf8');

const hero = `<section class="canon-hero" data-canon-hero>
  <div class="canon-hero-noise" aria-hidden="true"></div>
  <div class="canon-hero-inner">
    <div class="canon-hero-copy">
      <span class="canon-hero-kicker">WELCOME TO THE HOUSE</span>
      <h1><span>PLAY</span><span>SMARTER.</span></h1>
      <p>Casino. Poker. Tipsters.<br>The stories behind them.</p>
      <div class="canon-hero-actions">
        <a class="canon-hero-primary" href="/casinos/">EXPLORE HOUSE <b>↗</b></a>
        <a class="canon-hero-secondary" href="/tips/">VIEW TIPS <b>↗</b></a>
      </div>
      <div class="canon-member-proof" aria-label="Community members">
        <div class="canon-avatar-stack"><span>JK</span><span>AR</span><span>MT</span><span>NS</span><span>+</span></div>
        <div><strong>32K+</strong><small>Members</small></div>
      </div>
    </div>

    <div class="canon-slider" data-hero-slider data-active="1">
      <div class="canon-slide-track">
        <article class="canon-slide canon-slide-operator" data-slide="0">
          <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=84" alt="Dark casino gaming scene" width="760" height="980" fetchpriority="high">
          <span class="canon-slide-number">01</span><small>OPERATORS</small>
          <div class="canon-slide-bottom"><b>HOUSE SCORE</b><strong>9.4</strong></div>
        </article>

        <article class="canon-slide canon-slide-tip" data-slide="1">
          <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=84" alt="Football player in a stadium" width="760" height="980" fetchpriority="high">
          <span class="canon-slide-number">02</span><small>TIPS</small>
          <div class="canon-edge-label">EDGE <b>82%</b></div>
          <div class="canon-candle-chart" aria-hidden="true">${Array.from({length:18},(_,i)=>`<i style="--h:${28 + ((i*17)%64)}%"></i>`).join('')}</div>
        </article>

        <article class="canon-slide canon-slide-story" data-slide="2">
          <img src="https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=900&q=84" alt="Playing cards in dramatic light" width="760" height="980" loading="eager">
          <span class="canon-slide-number">03</span><small>STORIES</small>
          <div class="canon-story-title">THE<br>LEDGER</div>
        </article>
      </div>

      <div class="canon-slider-controls">
        <div class="canon-slider-bars" aria-hidden="true"><i></i><i></i><i></i></div>
        <div class="canon-slider-count"><strong data-slider-current>02</strong><span>/ 03</span></div>
        <button type="button" data-slider-prev aria-label="Previous slide">‹</button>
        <button type="button" data-slider-next aria-label="Next slide">›</button>
      </div>
    </div>
  </div>
</section>`;

html = html.replace(/<link rel="stylesheet" href="\/src\/styles\/canonical-hero\.css(?:\?v=[^"]*)?">/g, '');
html = html.replace('</head>', '<link rel="stylesheet" href="/src/styles/canonical-hero.css?v=070"></head>');
const next = html.replace(/<section class="ref-hero">[\s\S]*?<\/section>\s*(?=<section class="ref-pulse">)/, hero);
if (next === html) throw new Error('Canonical Phase 2 hero replacement failed');
if ((next.match(/<h1\b/g) || []).length !== 1) throw new Error('Canonical Phase 2 expected exactly one H1');
writeFileSync(file, next);
console.log('Applied canonical phase 2 hero slider.');
