import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../site.config.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const esc = value => String(value).replace(/[&<>\"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
const url = path => new URL(path, site.baseUrl).href;

const operators = [
  {slug:'northstar', name:'Northstar', score:'9.4', badge:'Editor pick', tags:'crypto fast-payout slots', points:['Fast payout profile','Strong mobile UX','Crypto-friendly discovery']},
  {slug:'orbit', name:'Orbit', score:'8.9', badge:'Poker pick', tags:'poker crypto', points:['Poker-led lobby','Clear bonus terms','Multi-device experience']},
  {slug:'velvet-ace', name:'Velvet Ace', score:'8.7', badge:'New', tags:'slots new', points:['Slot-first discovery','Clean onboarding','Modern game catalogue']}
];
const slots = [
  {slug:'neon-vault', name:'Neon Vault', provider:'House Studio', tags:'featured new bonus-buy', meta:'Demo slot concept'},
  {slug:'black-diamond', name:'Black Diamond', provider:'Northstar Labs', tags:'trending jackpot', meta:'Demo slot concept'},
  {slug:'after-hours', name:'After Hours', provider:'Orbit Play', tags:'featured megaways', meta:'Demo slot concept'},
  {slug:'zero-hour', name:'Zero Hour', provider:'Velvet Labs', tags:'new high-rtp', meta:'Demo slot concept'}
];
const articles = [
  {slug:'poker-moment', category:'Poker', title:'Why poker is having another moment', read:'8 min read'},
  {slug:'casino-choice', category:'Guide', title:'How to compare casino offers without the noise', read:'6 min read'},
  {slug:'tipster-proof', category:'Tipsters', title:'What a transparent tipster record should show', read:'7 min read'}
];
const tips = [
  {fixture:'Chelsea vs Arsenal', market:'Over 2.5', odds:'1.91', edge:'82%', tipster:'James K.'},
  {fixture:'Madrid vs Barcelona', market:'Both teams score', odds:'1.72', edge:'75%', tipster:'Alex R.'},
  {fixture:'Bayern vs Dortmund', market:'Home +0.5', odds:'1.86', edge:'78%', tipster:'Mark T.'}
];

const icon = name => ({search:'⌕', bell:'◉', menu:'≡', close:'×'}[name] || '•');
const navItems = [['/casinos/','Casino','casinos'],['/poker/','Poker','poker'],['/slots/','Slots','slots'],['/tips/','Tips','tips'],['/ledger/','Ledger','ledger'],['/coin/','Coin','coin']];

function header(current='') {
  return `<header class="site-header"><div class="container header-inner">
    <a class="brand" href="/" aria-label="The House home"><span class="brand-mark" aria-hidden="true"></span><span>The House</span></a>
    <nav class="main-nav" aria-label="Primary">${navItems.map(([href,label,key])=>`<a href="${href}" ${current===key?'aria-current="page"':''}>${label}</a>`).join('')}</nav>
    <div class="header-actions">
      <a class="icon-btn" href="/search/" aria-label="Search">${icon('search')}</a>
      <a class="icon-btn" href="/notifications/" data-notification-trigger aria-label="Notifications">${icon('bell')}<span class="notification-dot" aria-hidden="true"></span></a>
      <a class="coin-pill" href="/coin/" aria-label="House Coin balance"><span class="coin-dot">H</span><span data-coin-balance>2,840</span></a>
      <button class="menu-btn" type="button" data-menu-button aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">${icon('menu')}</button>
    </div></div>
    <nav class="mobile-menu" id="mobile-menu" data-mobile-menu data-open="false" aria-label="Mobile">${navItems.map(([href,label])=>`<a href="${href}">${label}</a>`).join('')}<a href="/profile/">Profile</a></nav>
  </header>`;
}
function mobileDock(current='') {
  const items = [['/','⌂','House','home'],['/casinos/','◇','Casinos','casinos'],['/tips/','↑','Tips','tips'],['/ledger/','▰','Ledger','ledger'],['/profile/','○','You','profile']];
  return `<nav class="mobile-dock" aria-label="Mobile primary">${items.map(([href,symbol,label,key])=>`<a href="${href}" ${current===key?'aria-current="page"':''}><b aria-hidden="true">${symbol}</b><span>${label}</span></a>`).join('')}</nav>`;
}
function notificationsDialog() {
  return `<dialog class="notification-dialog" data-notification-dialog aria-labelledby="notifications-title"><div class="dialog-head"><strong id="notifications-title">Notifications</strong><button class="icon-btn" type="button" data-dialog-close aria-label="Close notifications">${icon('close')}</button></div><div class="dialog-body notification-list">
    ${notificationItem('TIP','New tip is live','James K. published a new football pick.','2m')}
    ${notificationItem('HC','Coin reward added','Your weekly House Coin reward is ready.','1h')}
    ${notificationItem('NEW','New operator review','A new operator passport was published.','5h')}
    <a class="btn btn-secondary" href="/notifications/">View all notifications</a>
  </div></dialog>`;
}
function notificationItem(mark,title,text,time) { return `<article class="notification-item card"><div class="notification-icon">${mark}</div><div><strong>${title}</strong><div class="muted">${text}</div></div><time>${time}</time></article>`; }
function footer() {
 return `<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a class="brand" href="/"><span class="brand-mark" aria-hidden="true"></span><span>The House</span></a><p>Gaming discovery, tipster performance and editorial intelligence in one interface.</p></div>
 <div class="footer-links"><strong>Explore</strong><a href="/casinos/">Casinos</a><a href="/poker/">Poker</a><a href="/slots/">Slots</a><a href="/tips/">Tipsters</a></div>
 <div class="footer-links"><strong>Editorial</strong><a href="/ledger/">The Ledger</a><a href="/responsible-gaming/">Responsible gaming</a><a href="/search/">Search</a></div>
 <div class="footer-links"><strong>Account</strong><a href="/coin/">House Coin</a><a href="/notifications/">Notifications</a><a href="/profile/">Profile</a></div></div>
 <p class="responsible-note">18+ concept frontend. Gambling laws, operator availability and responsible-gaming requirements vary by jurisdiction. Final production content, offers, licences and compliance notices must be verified for each target market.</p></div></footer>`;
}
function breadcrumbs(items) {
 const list = [{name:'Home',path:'/'}].concat(items);
 return `<nav class="breadcrumb container" aria-label="Breadcrumb"><ol>${list.map((item,i)=>`<li>${i===list.length-1?`<span aria-current="page">${esc(item.name)}</span>`:`<a href="${item.path}">${esc(item.name)}</a>`}</li>`).join('')}</ol></nav>`;
}
function jsonLd(data) { return `<script type="application/ld+json">${JSON.stringify(data)}</script>`; }
function layout({title, description, path, current='', body, robots='index,follow,max-image-preview:large', schema=[]}) {
 const canonical = url(path);
 const schemas = Array.isArray(schema) ? schema : [schema];
 return `<!doctype html><html lang="${site.lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="${robots}"><link rel="canonical" href="${canonical}"><meta name="theme-color" content="${site.themeColor}"><meta name="color-scheme" content="dark"><meta property="og:type" content="website"><meta property="og:site_name" content="${site.name}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${