import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
const root=process.cwd();
const pages=[];
function walk(dir){for(const n of readdirSync(dir)){if(['node_modules','dist','src','scripts','public'].includes(n))continue;const f=resolve(dir,n);if(statSync(f).isDirectory())walk(f);else if(n==='index.html')pages.push(f)}}
walk(root);
let errors=0;
for(const file of pages){const html=readFileSync(file,'utf8');for(const m of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){const href=m[1];if(!href||href.startsWith('/src/')||href.startsWith('/favicon')||href.startsWith('/manifest'))continue;const target=href.endsWith('/')?resolve(root,'.'+href,'index.html'):resolve(root,'.'+href);if(!existsSync(target)){console.error(`Broken internal link ${href} in ${file}`);errors++;}}}
if(errors)process.exit(1);console.log(`Internal link check passed for ${pages.length} pages.`);
