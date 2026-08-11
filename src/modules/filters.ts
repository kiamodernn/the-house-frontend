export function initFilters(): void {
  document.querySelectorAll<HTMLElement>('[data-filter-group]').forEach(group => {
    const targetId = group.dataset.filterGroup;
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (!target) return;
    const cards = [...target.querySelectorAll<HTMLElement>('[data-tags]')];
    const empty = target.parentElement?.querySelector<HTMLElement>('[data-empty-state]');

    group.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(button => {
      button.addEventListener('click', () => {
        const value = button.dataset.filter || 'all';
        group.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        let visible = 0;
        for (const card of cards) {
          const tags = (card.dataset.tags || '').split(' ');
          const show = value === 'all' || tags.includes(value);
          card.hidden = !show;
          if (show) visible++;
        }
        if (empty) empty.style.display = visible ? 'none' : 'block';
      });
    });
  });
}
