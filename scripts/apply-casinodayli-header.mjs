import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const routes = [
  'index.html','casinos/index.html','casinos/stake-review/index.html','poker/index.html','slots/index.html',
  'slots/neon-vault/index.html','slots/black-diamond/index.html','slots/after-hours/index.html','slots/zero-hour/index.html',
  'tips/index.html','tipsters/james-k/index.html','ledger/index.html','ledger/poker-moment/index.html',
  'ledger/casino-choice/index.html','ledger/tipster-proof/index.html','coin/index.html','notifications/index.html',
  'search/index.html','profile/index.html','responsible-gaming/index.html'
];

const icon = {
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.3 15.5A8 8 0 0 1 8.5 4.7a8 8 0 1 0 10.8 10.8Z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"/></svg>',
  bell: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 5.1-2.2 6.3-2.2 7.5h16.4C20.2 15.3 18 14.1 18 9Z"/><path d="M9.7 20h4.6"/></svg>',
  user: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.3"/><path d="M5.7 19.3c.8-3.4 3.2-5.2 6.3-5.2s5.5 1.8 6.3 5.2"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>',
  home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3.5 10.5 8.5-7 8.5 7"/><path d="M5.5 9.5v10h13v-10M9.5 19.5v-6h5v6"/></svg>',
  casino: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/><circle cx="9" cy="15" r="1"/><circle cx="15" cy="15" r="1"/></svg>',
  poker: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.8c-1.5 3.1-5.6 4.2-5.6 7.7a4.1 4.1 0 0 0 7 2.9c0 2.2-.7 4-2.1 5.8h1.4c-1.4-1.8-2.1-3.6-2.1-5.8a4.1 4.1 0 0 0 7-2.9c0-3.5-4.1-4.6-5.6-7.7Z"/></svg>',
  tipsters: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="m15.8 8.2 4-4M16.8 4.2h3v3"/></svg>',
  bonuses: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13"/><path d="M12 7H8.7A2.2 2.2 0 1 1 11 4.2L12 7ZM12 7h3.3A2.2 2.2 0 1 0 13 4.2L12 7Z"/></svg>',
  blog: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.5h9l3 3v14H6z"/><path d="M15 3.5v3h3M9 11h6M9 15h6"/></svg>',
  coinbase: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M14.8 9.3a4 4 0 1 0 0 5.4M9 9.5h5.8M9 14.5h5.8"/></svg>',
  coin: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M14.8 8.8a4.1 4.1 0 1 0 0 6.4"/></svg>'
};

const navItems = [
  { key:'casino', label:'Casino', href:'/casinos/', icon:icon.casino },
  { key:'poker', label:'Poker', href:'/poker/', icon:icon.poker },
  { key:'tipsters', label:'Tipsters', href:'/tips/', icon:icon.tipsters },
  { key:'bonuses', label:'Bonuses', href:'/casinos/#bonuses', icon:icon.bonuses },
  { key:'blog', label:'Blog', href:'/ledger/', icon:icon.blog },
  { key:'coinbase', label:'Coinbase', href:'/coin/', icon:icon.coinbase }
];

const bottomItems = [
  { key:'home', label:'Home', href:'/', icon:icon.home },
  { key:'casino', label:'Casino', href:'/casinos/', icon:icon.casino },
  { key:'tipsters', label:'Tipsters', href:'/tips/', icon:icon.tipsters },
  { key:'bonuses', label:'Bonuses', href:'/casinos/#bonuses', icon:icon.bonuses },
  { key:'profile', label:'Profile', href:'/profile/', icon:icon.user }
];

function activeKeyFor(relative) {
  if (relative === 'index.html') return 'home';
  if (relative.startsWith('poker/')) return 'poker';
  if (relative.startsWith('tips/') || relative.startsWith('tipsters/')) return 'tipsters';
  if (relative.startsWith('ledger/')) return 'blog';
  if (relative.startsWith('coin/')) return 'coinbase';
  if (relative.startsWith('profile/')) return 'profile';
  if (relative.startsWith('casinos/')) return 'casino';
  return '';
}

const brand = '<span class="cd-brand-mark" aria-hidden="true"><i></i><i></i></span><span class="cd-wordmark">Casino<span>Dayli</span></span>';

function currentAttr(key, active) {
  return key === active ? ' aria-current="page"' : '';
}

function makeHeader(relative) {
  const active = activeKeyFor(relative);
  const desktopNav = navItems.map(item => `<li><a href="${item.href}" data-cd-nav-key="${item.key}"${currentAttr(item.key, active)}>${item.label}</a></li>`).join('');
  const drawerNav = navItems.map(item => `<li><a href="${item.href}" data-cd-nav-key="${item.key}"${currentAttr(item.key, active)}><span class="cd-drawer-row-icon">${item.icon}</span><span class="cd-drawer-row-label">${item.label}</span><span class="cd-drawer-chevron">${icon.chevron}</span></a></li>`).join('');
  const bottomNav = bottomItems.map(item => `<a href="${item.href}" data-cd-bottom-key="${item.key}"${currentAttr(item.key, active)}><span class="cd-bottom-icon">${item.icon}</span><span>${item.label}</span></a>`).join('');

  return `<header class="cd-header" data-cd-header data-scrolled="false">
    <div class="cd-header-shell">
      <div class="cd-header-left">
        <button class="cd-icon-btn cd-menu-btn" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="cd-mobile-drawer" data-cd-menu-open>${icon.menu}</button>
        <a class="cd-brand" href="/" aria-label="CasinoDayli home">${brand}</a>
      </div>
      <nav class="cd-desktop-nav" aria-label="Primary navigation"><ul>${desktopNav}</ul></nav>
      <div class="cd-actions">
        <a class="cd-icon-btn cd-search-btn" href="/search/" aria-label="Search" data-cd-search-trigger>${icon.search}</a>
        <button class="cd-theme-toggle" type="button" role="switch" aria-label="Switch color theme" aria-checked="true" data-cd-theme-toggle><span class="cd-theme-icon cd-theme-moon">${icon.moon}</span><span class="cd-theme-knob"></span><span class="cd-theme-icon cd-theme-sun">${icon.sun}</span></button>
        <a class="cd-wallet" href="/coin/" aria-label="Coin balance 12,450.50" data-cd-wallet><span class="cd-coin-icon">${icon.coin}</span><strong>12,450.50</strong></a>
        <a class="cd-icon-btn cd-notification-btn" href="/notifications/" aria-label="Notifications, 8 unread" data-cd-notifications-trigger>${icon.bell}<span class="cd-notification-badge" data-count="8">8</span></a>
        <a class="cd-profile" href="/profile/" aria-label="Profile" data-cd-profile-trigger><span class="cd-avatar" aria-hidden="true">CD</span><i class="cd-online-dot" aria-hidden="true"></i><span class="cd-profile-chevron" aria-hidden="true">${icon.chevron}</span></a>
      </div>
    </div>

    <div class="cd-drawer-backdrop" data-cd-drawer-backdrop hidden></div>
    <aside class="cd-drawer" id="cd-mobile-drawer" role="dialog" aria-modal="true" aria-hidden="true" aria-label="CasinoDayli navigation" tabindex="-1" data-cd-mobile-drawer>
      <div class="cd-drawer-head">
        <a class="cd-brand" href="/" aria-label="CasinoDayli home">${brand}</a>
        <button class="cd-icon-btn" type="button" aria-label="Close navigation" data-cd-menu-close>${icon.close}</button>
      </div>
      <nav class="cd-drawer-nav" aria-label="Mobile primary navigation"><ul>${drawerNav}</ul></nav>
      <div class="cd-drawer-divider"></div>
      <a class="cd-account-row" href="/profile/" data-cd-nav-key="profile"${currentAttr('profile', active)}><span class="cd-drawer-row-icon">${icon.user}</span><span><strong>Account</strong><small>Profile, settings and wallet</small></span><span class="cd-drawer-chevron">${icon.chevron}</span></a>
    </aside>

    <nav class="cd-bottom-nav" aria-label="Mobile primary navigation" data-cd-bottom-nav>${bottomNav}</nav>
  </header>`;
}

const themeBootstrap = `<script id="cd-theme-bootstrap">(()=>{try{const k='casinodayli-theme';const s=localStorage.getItem(k);const t=s==='light'||s==='dark'?s:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.cdTheme=t}catch{document.documentElement.dataset.cdTheme='dark'}})();</script>`;

let count = 0;
for (const relative of routes) {
  const file = resolve(process.cwd(), relative);
  let html = readFileSync(file, 'utf8');
  const header = makeHeader(relative);

  html = html
    .replace(/<script id="cd-theme-bootstrap">[\s\S]*?<\/script>/g, '')
    .replace(/<link rel="stylesheet" href="\/src\/styles\/casinodayli-header\.css(?:\?v=[^"]*)?">/g, '')
    .replace(/<link rel="stylesheet" href="\/src\/styles\/casinodayli-header-mobile\.css(?:\?v=[^"]*)?">/g, '')
    .replace('</head>', `${themeBootstrap}<link rel="stylesheet" href="/src/styles/casinodayli-header.css?v=130"><link rel="stylesheet" href="/src/styles/casinodayli-header-mobile.css?v=130"></head>`);

  if (/<header class="cd-header"[\s\S]*?<\/header>/.test(html)) html = html.replace(/<header class="cd-header"[\s\S]*?<\/header>/, header);
  else if (/<header class="site-header">[\s\S]*?<\/header>/.test(html)) html = html.replace(/<header class="site-header">[\s\S]*?<\/header>/, header);
  else throw new Error(`CasinoDayli header replacement failed for ${relative}`);

  if (!html.includes('data-cd-header')) throw new Error(`CasinoDayli header missing in ${relative}`);
  if (!html.includes('data-cd-bottom-nav')) throw new Error(`CasinoDayli mobile bottom nav missing in ${relative}`);
  writeFileSync(file, html);
  count++;
}

console.log(`Applied complete CasinoDayli navigation system to ${count} routes.`);
