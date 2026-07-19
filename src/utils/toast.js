/**
 * Minimal Bootstrap toast helper so pages don't have to use raw alert().
 * Expects a <div id="toast-container" class="toast-container position-fixed bottom-0 end-0 p-3"></div>
 * to exist somewhere on the page (see pages markup).
 */
export function showToast(message, variant = 'primary') {
  const container = document.getElementById('toast-container');
  if (!container) {
    // eslint-disable-next-line no-console
    console.warn('No #toast-container on this page; falling back to alert.');
    alert(message);
    return;
  }

  const el = document.createElement('div');
  el.className = `toast align-items-center text-bg-${variant} border-0`;
  el.setAttribute('role', 'alert');
  el.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>`;
  container.appendChild(el);

  // Requires bootstrap JS bundle to be imported on the page (see src/main.js pattern).
  // eslint-disable-next-line no-undef
  const toast = new bootstrap.Toast(el, { delay: 4000 });
  toast.show();
  el.addEventListener('hidden.bs.toast', () => el.remove());
}
