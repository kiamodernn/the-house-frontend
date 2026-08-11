import { initNavigation } from './modules/nav.js';
import { initNotifications } from './modules/notifications.js';
import { initFilters } from './modules/filters.js';
import { initCoin } from './modules/coin.js';

const boot = () => {
  document.documentElement.classList.add('js');
  initNavigation();
  initNotifications();
  initFilters();
  initCoin();
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();
