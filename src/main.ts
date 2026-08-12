import { initCasinoDayliHeader } from './modules/casinodayli-header.js';

const boot = () => {
  document.documentElement.classList.add('js');
  initCasinoDayliHeader();
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();
