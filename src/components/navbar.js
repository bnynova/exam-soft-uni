import { getSession, getCurrentProfile, logout } from '../services/authService.js';

/**
 * Renders the shared navbar into <div id="navbar"></div> and wires up
 * login-state-aware links (Login/Register vs Profile/Admin/Logout).
 * Call this once from every page's entry JS.
 */
export async function renderNavbar() {
  const mount = document.getElementById('navbar');
  if (!mount) return;

  const session = await getSession();
  const profile = session ? await getCurrentProfile() : null;

  mount.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="/index.html"><i class="bi bi-egg-fried"></i> Recipe Share</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav ms-auto align-items-lg-center gap-2">
            ${
              profile
                ? `
              <li class="nav-item"><a class="nav-link" href="/pages/recipe-form.html"><i class="bi bi-plus-lg"></i> Add recipe</a></li>
              <li class="nav-item"><a class="nav-link" href="/pages/profile.html">${profile.username}</a></li>
              ${profile.role === 'admin' ? '<li class="nav-item"><a class="nav-link" href="/pages/admin.html">Admin</a></li>' : ''}
              <li class="nav-item"><button id="logout-btn" class="btn btn-outline-light btn-sm">Logout</button></li>
            `
                : `
              <li class="nav-item"><a class="nav-link" href="/pages/login.html">Login</a></li>
              <li class="nav-item"><a class="nav-link" href="/pages/register.html">Register</a></li>
            `
            }
          </ul>
        </div>
      </div>
    </nav>`;

  document.getElementById('logout-btn')?.addEventListener('click', async () => {
    await logout();
    window.location.href = '/index.html';
  });
}
