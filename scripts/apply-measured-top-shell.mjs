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

  html = html
    .replace(/<link rel="stylesheet" href="\/src\/styles\/canonical-shell\.css(?:\?v=[^"]*)?">/g, '')
    .replace(/<link rel="stylesheet" href="\/src\/styles\/canonical-hero\.css(?:\?v=[^"]*)?">/g, '')
    .replace(/<link rel="stylesheet" href="\/src\/styles\/canonical-pulse\.css(?:\?v=[^"]*)?">/g, '')
    .replace(/<link rel="stylesheet" href="\/src\/styles\/measured-top-shell\.css(?:\?v=[^"]*)?">/g, '');

  html = html.replace('</head>', '<link rel="stylesheet" href="/src/styles/measured-top-shell.css?v=100"></head>');

  if (!html.includes('canon-header')) throw new Error(`Measured top shell: canonical header missing in ${relative}`);
  if (relative === 'index.html') {
    if (!html.includes('canon-hero')) throw new Error('Measured top shell: canonical hero missing');
    if (!html.includes('canon-pulse')) throw new Error('Measured top shell: canonical pulse missing');
    if (!html.includes('data-active="1"')) throw new Error('Measured top shell: expected TIPS as initial active slide');
  }

  writeFileSync(file, html);
  count++;
}

console.log(`Applied measured single-source top shell to ${count} routes.`);
