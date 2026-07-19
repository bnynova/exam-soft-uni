import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import '../styles/main.css';

import { renderNavbar } from '../components/navbar.js';
import { register } from '../services/authService.js';
import { showToast } from '../utils/toast.js';

renderNavbar();

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    await register(email, password, username);
    showToast('Account created! Check your email if confirmation is required, then log in.', 'success');
    window.location.href = '/pages/login.html';
  } catch (err) {
    showToast(err.message ?? 'Registration failed', 'danger');
  }
});
