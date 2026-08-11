export function initHeroSlider() {
  const root = document.querySelector<HTMLElement>('[data-hero-slider]');
  if (!root) return;

  const prev = root.querySelector<HTMLButtonElement>('[data-slider-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-slider-next]');
  const current = root.querySelector<HTMLElement>('[data-slider-current]');
  const bars = Array.from(root.querySelectorAll<HTMLElement>('.canon-slider-bars i'));
  let active = 1;

  const render = () => {
    root.dataset.active = String(active);
    if (current) current.textContent = String(active + 1).padStart(2, '0');
    bars.forEach((bar, index) => {
      bar.style.background = index === active ? '#f3f0e8' : '#353835';
      bar.style.width = index === active ? '26px' : '20px';
    });
  };

  prev?.addEventListener('click', () => {
    active = (active + 2) % 3;
    render();
  });

  next?.addEventListener('click', () => {
    active = (active + 1) % 3;
    render();
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') prev?.click();
    if (event.key === 'ArrowRight') next?.click();
  });

  render();
}
