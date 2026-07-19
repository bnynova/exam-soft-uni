import { getSession, getCurrentProfile } from '../services/authService.js';

/** Redirects to /pages/login.html if there is no logged-in user. Call at the top of a protected page's JS. */
export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    window.location.href = '/pages/login.html';
    return null;
  }
  return session;
}

/** Redirects non-admins back to the home page. Call at the top of admin.js. */
export async function requireAdmin() {
  const session = await requireAuth();
  if (!session) return null;

  const profile = await getCurrentProfile();
  if (profile?.role !== 'admin') {
    window.location.href = '/index.html';
    return null;
  }
  return profile;
}
