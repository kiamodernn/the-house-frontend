import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const routes = [
  'index.html','casinos/index.html','casinos/stake-review/index.html','poker/index.html','slots/index.html',
  'slots/neon-vault/index.html','slots/black-diamond/index.html','slots/after-hours/index.html','slots/zero-hour/index.html',
  'tips/index.html','tipsters/james-k/index.html','ledger/index.html','ledger/poker-moment/index.html',
  'ledger/casino-choice/index.html','ledger/tipster-proof/index.html','coin/index.html','notifications/index.html',
  'search/index.html','profile/index.html','responsible-gaming/index.html'
];

const searchIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 4.1 4.1"></path></svg>';
const bellIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8.2a6 6 0 0 0-12 0c0 6.4-2.8 7.2-2.8 8.8h17.6c0-1.6-2.8-2.4-2.8-8.8Z"></path><path d="M9.7 20.2h4.6"></path></svg>';
const profileIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.4"></circle><path d="M5.8 19.2c.8-3.4 3.1-5.1 6.2-5.1s5.4 1.7 6.2 5.1"></path></svg>';
const header = `<header class="canon-header"><div class="canon-header-inner"><a class="canon-brand" href="/" aria-label="The House home"><span class="canon-brand-slash"></span><span class="canon-brand-copy"><small>THE</small><strong>HOUSE</strong></span></a><nav class="canon-nav" aria-label="Primary"><a href="/casinos/">CASINO</a><a href="/poker/">POKER</a><a href="/tips/">TIPS</a><a href="/ledger/">LEDGER</a><a href="/tipsters/james-k/">RANKINGS</a><a href="/ledger/casino-choice/">GUIDES</a><a href="/ledger/">NEWS</a></nav><div class="canon-actions"><a class="canon-action-icon" href="/search/" aria-label="Search">${searchIcon}</a><a class="canon-action-icon canon-action-bell" href="/notifications/" aria-label="Notifications">${bellIcon}<i></i></a><a class="canon-coin" href="/coin/" aria-label="House Coin balance 2,450"><span class="canon-coin-mark">H</span><strong>2,450</strong><span class="canon-coin-caret">⌄</span></a><a class="canon-profile" href="/profile/" aria-label="Profile"><span>${profileIcon}</span></a></div></div></header>`;

let count = 0;
for (const relative of routes) {
  const file = resolve(process.cwd(), relative);
  let html = readFileSync(file, 'utf8');
  const versionedCss = '/src/styles/canonical-shell.css?v=090';
  html = html.replace(/<link rel="stylesheet" href="\/src\/styles\/canonical-shell\.css(?:\?v=[^"]*)?">/g, '');
  html = html.replace('</head>', `<link rel="stylesheet" href="${versionedCss}"></head>`);
  html = html.replace(/<body(?:\s+class="[^"]*")?>/, '<body class="canonical-shell-phase1">');
  html = html.replace(/<header class="ref-header">[\s\S]*?<\/header>/, header);
  html = html.replace(/<header class="canon-header">[\s\S]*?<\/header>/, header);
  html = html.replace(/<aside class="canon-phone-preview"[\s\S]*?<\/aside>/g, '');
  if (!html.includes('canon-header')) throw new Error(`Canonical header replacement failed for ${relative}`);
  writeFileSync(file, html);
  count++;
}
console.log(`Applied canonical phase 1 header/frame to ${count} routes.`);
