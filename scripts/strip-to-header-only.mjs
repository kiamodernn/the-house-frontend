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

  html = html.replace(/<link rel="stylesheet" href="\/src\/styles\/header-only-baseline\.css(?:\?v=[^"]*)?">/g, '');
  html = html.replace('</head>', '<link rel="stylesheet" href="/src/styles/header-only-baseline.css?v=120"></head>');

  html = html.replace(/<main id="main"[\s\S]*?<\/main>/, '<main id="main" class="header-only-main"><h1 class="sr-only">CasinoDayli</h1></main>');
  html = html.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, '');

  if (!html.includes('data-cd-header')) throw new Error(`Header-only baseline missing CasinoDayli header in ${relative}`);
  if (!html.includes('class="header-only-main"')) throw new Error(`Header-only baseline failed to strip main in ${relative}`);
  if (html.includes('site-footer')) throw new Error(`Header-only baseline failed to remove footer in ${relative}`);

  writeFileSync(file, html);
  count++;
}

console.log(`Stripped content/footer; header-only baseline applied to ${count} routes.`);
