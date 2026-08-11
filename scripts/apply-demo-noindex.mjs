import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

if (process.env.DEMO_NOINDEX !== '1') process.exit(0);

const root = process.cwd();
const files = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (['node_modules', 'dist', 'src', 'scripts', 'public'].includes(name)) continue;
    const full = resolve(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name === 'index.html') files.push(full);
  }
}
walk(root);
for (const file of files) {
  const html = readFileSync(file, 'utf8').replace(
    /<meta name="robots" content="[^"]+">/,
    '<meta name="robots" content="noindex,nofollow,noarchive">'
  );
  writeFileSync(file, html);
}
console.log(`Applied demo noindex to ${files.length} pages.`);
