import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const htmlFiles = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (['node_modules', 'dist', 'src', 'scripts', 'public'].includes(name)) continue;
    const full = resolve(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name === 'index.html') htmlFiles.push(full);
  }
}

walk(root);
let errors = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const checks = [
    ['title', /<title>[^<]+<\/title>/],
    ['description', /<meta name="description" content="[^"]+">/],
    ['canonical', /<link rel="canonical" href="https?:\/\/[^\"]+">/],
    ['robots', /<meta name="robots" content="[^"]+">/],
    ['h1', /<h1[\s>]/],
    ['lang', /<html lang="[^"]+">/]
  ];

  for (const [label, pattern] of checks) {
    if (!pattern.test(html)) {
      console.error(`SEO missing ${label}: ${file}`);
      errors++;
    }
  }

  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) {
    console.error(`SEO expected 1 h1, got ${h1s}: ${file}`);
    errors++;
  }
}

if (errors) process.exit(1);
console.log(`SEO baseline passed for ${htmlFiles.length} pages.`);
