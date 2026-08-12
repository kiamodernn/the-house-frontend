import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const routes = [
  'index.html','casinos/index.html','casinos/stake-review/index.html','poker/index.html','slots/index.html',
  'slots/neon-vault/index.html','slots/black-diamond/index.html','slots/after-hours/index.html','slots/zero-hour/index.html',
  'tips/index.html','tipsters/james-k/index.html','ledger/index.html','ledger/poker-moment/index.html',
  'ledger/casino-choice/index.html','ledger/tipster-proof/index.html','coin/index.html','notifications/index.html',
  'search/index.html','profile/index.html','responsible-gaming/index.html'
];

const icons={
menu:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
search:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>',
moon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.4 15.6A8 8 0 0 1 8.4 4.6 8 8 0 1 0 19.4 15.6Z"/></svg>',
sun:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.7"/><path d="M12 2.3v2.1M12 19.6v2.1M2.3 12h2.1M19.6 12h2.1M5.1 5.1l1.5 1.5M17.4 17.4l1.5 1.5M18.9 5.1l-1.5 1.5M6.6 17.4l-1.5 1.5"/></svg>',
bell:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 5.1-2.2 6.3-2.2 7.5h16.4C20.2 15.3 18 14.1 18 9Z"/><path d="M9.7 20h4.6"/></svg>',
close:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
chevron:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>'};

const navItems=[['Casino','/casinos/'],['Poker','/poker/'],['Tipsters','/tips/'],['Bonuses','/casinos/'],['Blog','/ledger/'],['Coinbase','/coin/']];
const activeFor=relative=>relative.startsWith('poker/')?'Poker':relative.startsWith('tips/')||relative.startsWith('tipsters/')?'Tipsters':relative.startsWith('ledger/')?'Blog':relative.startsWith('coin/')?'Coinbase':relative.startsWith('casinos/')?'Casino':'';
const brand='<span class="cd-brand-mark" aria-hidden="true"><i></i><i></i></span><span class="cd-wordmark">Casino<span>Dayli</span></span>';

function makeHeader(relative){
  const active=activeFor(relative);
  const nav=navItems.map(([label,href])=>`<li><a href="${href}"${label===active?' aria-current="page"':''}>${label}</a></li>`).join('');
  const drawerNav=navItems.map(([label,href])=>`<li><a href="${href}"${label===active?' aria-current="page"':''}><span>${label}</span>${icons.chevron}</a></li>`).join('');
  return `<header class="cd-header" data-cd-header><div class="cd-header-shell"><div class="cd-header-left"><button class="cd-icon-btn cd-menu-btn" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="cd-mobile-drawer" data-cd-menu-open>${icons.menu}</button><a class="cd-brand" href="/" aria-label="CasinoDayli home">${brand}</a></div><nav class="cd-desktop-nav" aria-label="Primary navigation"><ul>${nav}</ul></nav><div class="cd-actions"><a class="cd-icon-btn" href="/search/" aria-label="Search">${icons.search}</a><button class="cd-theme-toggle" type="button" role="switch" aria-label="Switch color theme" aria-checked="true" data-cd-theme-toggle><span class="cd-theme-icon cd-theme-moon">${icons.moon}</span><span class="cd-theme-knob"></span><span class="cd-theme-icon cd-theme-sun">${icons.sun}</span></button><a class="cd-wallet" href="/coin/" aria-label="Coin balance 12,450.50"><span class="cd-coin-icon">C</span><strong>12,450.50</strong></a><a class="cd-icon-btn cd-notification-btn" href="/notifications/" aria-label="Notifications, 8 unread">${icons.bell}<span class="cd-notification-badge">8</span></a><a class="cd-profile" href="/profile/" aria-label="Profile"><span class="cd-avatar">CD</span><i class="cd-online-dot" aria-hidden="true"></i></a></div></div><div class="cd-drawer-backdrop" data-cd-drawer-backdrop hidden></div><aside class="cd-drawer" id="cd-mobile-drawer" aria-hidden="true" aria-label="Mobile navigation" data-cd-mobile-drawer><div class="cd-drawer-head"><a class="cd-brand" href="/" aria-label="CasinoDayli home">${brand}</a><button class="cd-icon-btn" type="button" aria-label="Close navigation" data-cd-menu-close>${icons.close}</button></div><nav class="cd-drawer-nav" aria-label="Mobile primary navigation"><ul>${drawerNav}</ul></nav><div class="cd-drawer-divider"></div><a class="cd-account-row" href="/profile/"><span class="cd-avatar">CD</span><span><strong>My account</strong><small>Profile, settings and preferences</small></span>${icons.chevron}</a></aside></header>`;
}

let count=0;
for(const relative of routes){
  const file=resolve(process.cwd(),relative);let html=readFileSync(file,'utf8');const header=makeHeader(relative);
  html=html.replace(/<link rel="stylesheet" href="\/src\/styles\/casinodayli-header\.css(?:\?v=[^"]*)?">/g,'').replace('</head>','<link rel="stylesheet" href="/src/styles/casinodayli-header.css?v=111"></head>');
  if(/<header class="canon-header">[\s\S]*?<\/header>/.test(html))html=html.replace(/<header class="canon-header">[\s\S]*?<\/header>/,header);else if(/<header class="ref-header">[\s\S]*?<\/header>/.test(html))html=html.replace(/<header class="ref-header">[\s\S]*?<\/header>/,header);else if(/<header class="site-header">[\s\S]*?<\/header>/.test(html))html=html.replace(/<header class="site-header">[\s\S]*?<\/header>/,header);else throw new Error(`CasinoDayli header replacement failed for ${relative}`);
  if(!html.includes('data-cd-header'))throw new Error(`CasinoDayli header missing in ${relative}`);writeFileSync(file,html);count++;
}
console.log(`Applied CasinoDayli header baseline to ${count} routes.`);
