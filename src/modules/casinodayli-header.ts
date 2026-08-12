const THEME_KEY = 'casinodayli-theme';
const DRAWER_BREAKPOINT = '(min-width: 1024px)';

type Theme = 'dark' | 'light';
type NavKey = 'home' | 'casino' | 'poker' | 'tipsters' | 'bonuses' | 'blog' | 'coinbase' | 'profile' | '';

function isTheme(value: string | null): value is Theme {
  return value === 'dark' || value === 'light';
}

function navKeyFromLocation(): NavKey {
  const { pathname, hash } = window.location;
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/casinos/')) return hash === '#bonuses' ? 'bonuses' : 'casino';
  if (pathname.startsWith('/poker/')) return 'poker';
  if (pathname.startsWith('/tips/') || pathname.startsWith('/tipsters/')) return 'tipsters';
  if (pathname.startsWith('/ledger/')) return 'blog';
  if (pathname.startsWith('/coin/')) return 'coinbase';
  if (pathname.startsWith('/profile/')) return 'profile';
  return '';
}

export function initCasinoDayliHeader(): void {
  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector<HTMLElement>('[data-cd-header]');
  if (!header) return;

  const themeToggle = header.querySelector<HTMLButtonElement>('[data-cd-theme-toggle]');
  const openButton = header.querySelector<HTMLButtonElement>('[data-cd-menu-open]');
  const closeButton = header.querySelector<HTMLButtonElement>('[data-cd-menu-close]');
  const drawer = header.querySelector<HTMLElement>('[data-cd-mobile-drawer]');
  const backdrop = header.querySelector<HTMLElement>('[data-cd-drawer-backdrop]');
  const desktopMedia = window.matchMedia(DRAWER_BREAKPOINT);
  const systemTheme = window.matchMedia('(prefers-color-scheme: light)');

  const setCurrentNavigation = () => {
    const key = navKeyFromLocation();
    header.querySelectorAll<HTMLElement>('[data-cd-nav-key],[data-cd-bottom-key]').forEach(item => {
      const itemKey = item.dataset.cdNavKey ?? item.dataset.cdBottomKey ?? '';
      if (itemKey === key) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });
  };

  setCurrentNavigation();
  window.addEventListener('hashchange', setCurrentNavigation);
  window.addEventListener('popstate', setCurrentNavigation);

  const storedTheme = localStorage.getItem(THEME_KEY);
  let theme: Theme = isTheme(storedTheme) ? storedTheme : (systemTheme.matches ? 'light' : 'dark');

  const applyTheme = (nextTheme: Theme, persist: boolean) => {
    theme = nextTheme;
    root.dataset.cdTheme = theme;
    if (persist) localStorage.setItem(THEME_KEY, theme);
    themeToggle?.setAttribute('aria-checked', String(theme === 'dark'));
    themeToggle?.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    window.dispatchEvent(new CustomEvent('casinodayli:themechange', { detail: { theme } }));
  };

  applyTheme(theme, false);
  themeToggle?.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark', true));
  systemTheme.addEventListener('change', event => {
    if (isTheme(localStorage.getItem(THEME_KEY))) return;
    applyTheme(event.matches ? 'light' : 'dark', false);
  });

  let scrollFrame = 0;
  const syncScrolledState = () => {
    scrollFrame = 0;
    header.dataset.scrolled = String(window.scrollY > 16);
  };
  syncScrolledState();
  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(syncScrolledState);
  }, { passive: true });

  if (!openButton || !closeButton || !drawer || !backdrop) return;
  drawer.setAttribute('inert', '');

  let previouslyFocused: HTMLElement | null = null;
  let lockedScrollY = 0;
  const focusableSelector = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';

  const lockPage = () => {
    lockedScrollY = window.scrollY;
    body.style.position = 'fixed';
    body.style.top = `-${lockedScrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
  };

  const unlockPage = () => {
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.width = '';
    window.scrollTo({ top: lockedScrollY, left: 0, behavior: 'auto' });
  };

  const closeDrawer = (restoreFocus = true) => {
    if (drawer.dataset.open !== 'true') return;
    drawer.dataset.open = 'false';
    drawer.setAttribute('aria-hidden', 'true');
    drawer.setAttribute('inert', '');
    backdrop.dataset.open = 'false';
    root.dataset.cdDrawerOpen = 'false';
    openButton.setAttribute('aria-expanded', 'false');
    window.setTimeout(() => { backdrop.hidden = true; }, 240);
    unlockPage();
    if (restoreFocus) previouslyFocused?.focus();
  };

  const openDrawer = () => {
    if (drawer.dataset.open === 'true') return;
    previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : openButton;
    lockPage();
    drawer.removeAttribute('inert');
    backdrop.hidden = false;
    root.dataset.cdDrawerOpen = 'true';
    openButton.setAttribute('aria-expanded', 'true');
    window.requestAnimationFrame(() => {
      drawer.dataset.open = 'true';
      drawer.setAttribute('aria-hidden', 'false');
      backdrop.dataset.open = 'true';
      closeButton.focus();
    });
  };

  openButton.addEventListener('click', openDrawer);
  closeButton.addEventListener('click', () => closeDrawer());
  backdrop.addEventListener('click', () => closeDrawer());
  drawer.querySelectorAll<HTMLAnchorElement>('a').forEach(link => link.addEventListener('click', () => closeDrawer(false)));

  desktopMedia.addEventListener('change', event => {
    if (event.matches && drawer.dataset.open === 'true') closeDrawer(false);
  });

  document.addEventListener('keydown', event => {
    if (drawer.dataset.open !== 'true') return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDrawer();
      return;
    }
    if (event.key !== 'Tab') return;

    const focusable = Array.from(drawer.querySelectorAll<HTMLElement>(focusableSelector)).filter(element => !element.hasAttribute('hidden'));
    const first = focusable.at(0);
    const last = focusable.at(-1);
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}
