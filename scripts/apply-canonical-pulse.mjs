import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const file = resolve(process.cwd(), 'index.html');
let html = readFileSync(file, 'utf8');

const pulse = `<section class="canon-pulse" aria-label="The Pulse live signals">
  <div class="canon-pulse-inner">
    <div class="canon-pulse-brand">
      <span class="canon-pulse-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
      <div><strong>THE PULSE</strong><small>LIVE SIGNAL</small></div>
    </div>

    <a class="canon-pulse-item" href="/tips/">
      <span class="canon-pulse-badge club">C</span>
      <div class="canon-pulse-copy"><div><strong>ARS vs CHE</strong><time>21:00</time></div><small>Tipster momentum <b>↑</b></small></div>
    </a>

    <a class="canon-pulse-item" href="/casinos/stake-review/">
      <span class="canon-pulse-badge money">$</span>
      <div class="canon-pulse-copy"><div><strong>Stake</strong></div><small>Payout score <b>9.4</b></small></div>
    </a>

    <a class="canon-pulse-item" href="/casinos/">
      <span class="canon-pulse-badge star">★</span>
      <div class="canon-pulse-copy"><div><strong>PokerStars</strong></div><small>New review</small></div>
    </a>

    <a class="canon-pulse-item" href="/casinos/">
      <span class="canon-pulse-badge btc">₿</span>
      <div class="canon-pulse-copy"><div><strong>BTC</strong></div><small>24 casinos support</small></div>
    </a>

    <a class="canon-pulse-view" href="/casinos/">View all <span>→</span></a>
  </div>
</section>`;

html = html.replace(/<link rel="stylesheet" href="\/src\/styles\/canonical-pulse\.css(?:\?v=[^"]*)?">/g, '');
html = html.replace('</head>', '<link rel="stylesheet" href="/src/styles/canonical-pulse.css?v=080"></head>');
const next = html.replace(/<section class="ref-pulse">[\s\S]*?<\/section>\s*(?=<section class="ref-section ref-operators">)/, pulse);
if (next === html) throw new Error('Canonical Phase 3 pulse replacement failed');
writeFileSync(file, next);
console.log('Applied canonical phase 3 pulse.');
