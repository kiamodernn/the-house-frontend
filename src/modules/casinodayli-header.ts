const THEME_KEY = 'casinodayli-theme';

type Theme = 'dark' | 'light';

export function initCasinoDayliHeader(): void {
  const root = document.documentElement;
  const header = document.querySelector<HTMLElement>('[data-cd-header]');
  if (!header) return;

  const themeToggle = header.querySelector<HTMLButtonElement>('[data-cd-theme-toggle]');
  const openButton = header.querySelector<HTMLButtonElement>('[data-cd-menu-open]');
  const closeButton = header.querySelector<HTMLButtonElement>('[data-cd-menu-close]');
  const drawer = header.querySelector<HTMLElement>('[data-cd-mobile-drawer]');
  const backdrop = header.querySelector<HTMLElement>('[data-cd-drawer-backdrop]');

  const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  let theme: Theme = storedTheme ?? (systemPrefersLight ? 'light' : 'dark');

  const applyTheme = (nextTheme: Theme) => {
    theme = nextTheme;
    root.dataset.cdTheme = theme;
    localStorage.setItem(THEME_KEY, theme);
    themeToggle?.setAttribute('aria-checked', String(theme === 'dark'));
  };

  applyTheme(theme);
  themeToggle?.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));

  if (!openButton || !closeButton || !drawer || !backdrop) return;

  let previouslyFocused: HTMLElement | null = null;
  const focusableSelector = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';

  const closeDrawer = () => {
    drawer.dataset.open = 'false';
    drawer.setAttribute('aria-hidden', 'true');
    backdrop.dataset.open = 'false';
    backdrop.hidden = true;
    root.dataset.cdDrawerOpen = 'false';
    openButton.setAttribute('aria-expanded', 'false');
    previouslyFocused?.focus();
  };

  const openDrawer = () => {
    previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : openButton;
    backdrop.hidden = false;
    requestAnimationFrame(() => {
      drawer.dataset.open = 'true';
      drawer.setAttribute('aria-hidden', 'false');
      backdrop.dataset.open = 'true';
      root.dataset.cdDrawerOpen = 'true';
      openButton.setAttribute('aria-expanded', 'true');
      closeButton.focus();
    });
  };

  openButton.addEventListener('click', openDrawer);
  closeButton.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(link => link.addEventListener('click', closeDrawer));

  document.addEventListener('keydown', event => {
    if (drawer.dataset.open !== 'true') return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDrawer();
      return;
    }
    if (event.key !== 'Tab') return;

    const focusable = Array.from(drawer.querySelectorAll<HTMLElement>(focusableSelector)).filter(el => !el.hasAttribute('hidden'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}
