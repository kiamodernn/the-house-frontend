import { initNavigation } from './modules/nav.js';
import { initNotifications } from './modules/notifications.js';
import { initFilters } from './modules/filters.js';
import { initCoin } from './modules/coin.js';
import { initHeroSlider } from './modules/hero-slider.js';

const boot = () => {
  document.documentElement.classList.add('js');
  initNavigation();
  initNotifications();
  initFilters();
  initCoin();
  initHeroSlider();
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();
