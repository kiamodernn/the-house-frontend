import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const routes = [
  'index.html','casinos/index.html','casinos/stake-review/index.html','poker/index.html','slots/index.html',
  'slots/neon-vault/index.html','slots/black-diamond/index.html','slots/after-hours/index.html','slots/zero-hour/index.html',
  'tips/index.html','tipsters/james-k/index.html','ledger/index.html','ledger/poker-moment/index.html',
  'ledger/casino-choice/index.html','ledger/tipster-proof/index.html','coin/index.html','notifications/index.html',
  'search/index.html','profile/index.html','responsible-gaming/index.html'
];

let count = 0;
for (const relative of routes) {
  const file = resolve(process.cwd(), relative);
  let html = readFileSync(file, 'utf8');
  if (!html.includes('/src/styles/reference-pixel.css')) {
    html = html.replace('</head>', '<link rel="stylesheet" href="/src/styles/reference-pixel.css"></head>');
  }
  writeFileSync(file, html);
  count++;
}
console.log(`Applied measured pixel-reference pass to ${count} routes.`);
