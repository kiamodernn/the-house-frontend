export function initNotifications(): void {
  const dialog = document.querySelector<HTMLDialogElement>('[data-notification-dialog]');
  if (!dialog) return;
  document.querySelectorAll<HTMLAnchorElement>('[data-notification-trigger]').forEach(trigger => {
    trigger.addEventListener('click', event => {
      if (typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      dialog.showModal();
    });
  });
  dialog.querySelector<HTMLButtonElement>('[data-dialog-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
}
