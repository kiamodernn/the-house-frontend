const BALANCE_KEY = 'thehouse.demo.coin.balance';
export function initCoin(): void {
  const elements = [...document.querySelectorAll<HTMLElement>('[data-coin-balance]')];
  if (!elements.length) return;
  const stored = Number(localStorage.getItem(BALANCE_KEY));
  const balance = Number.isFinite(stored) && stored > 0 ? stored : 2840;
  for (const el of elements) el.textContent = balance.toLocaleString('en-GB');
}
