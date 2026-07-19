import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import '../styles/main.css';

import { renderNavbar } from '../components/navbar.js';
import { login } from '../services/authService.js';
import { showToast } from '../utils/toast.js';

renderNavbar();

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    await login(email, password);
    window.location.href = '/index.html';
  } catch (err) {
    showToast(err.message ?? 'Login failed', 'danger');
  }
});
