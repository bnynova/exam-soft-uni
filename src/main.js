import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import '../src/styles/main.css';

import { renderNavbar } from './components/navbar.js';
import { recipeCardTemplate } from './components/recipeCard.js';
import { getAllRecipes } from './services/recipeService.js';
import { getAllCategories } from './services/categoryService.js';
import { showToast } from './utils/toast.js';

async function loadCategories() {
  const select = document.getElementById('category-select');
  try {
    const categories = await getAllCategories();
    for (const c of categories) {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name;
      select.appendChild(opt);
    }
  } catch (err) {
    console.error(err);
  }
}

async function loadRecipes(filters = {}) {
  const grid = document.getElementById('recipe-grid');
  const emptyState = document.getElementById('empty-state');
  try {
    const recipes = await getAllRecipes(filters);
    grid.innerHTML = recipes.map(recipeCardTemplate).join('');
    emptyState.classList.toggle('d-none', recipes.length > 0);
  } catch (err) {
    console.error(err);
    showToast('Could not load recipes. Check your Supabase config.', 'danger');
  }
}

function wireFilters() {
  const form = document.getElementById('filter-form');
  const searchInput = document.getElementById('search-input');
  const categorySelect = document.getElementById('category-select');

  form.addEventListener('submit', (e) => e.preventDefault());
  const applyFilters = () =>
    loadRecipes({
      search: searchInput.value.trim() || undefined,
      categoryId: categorySelect.value || undefined,
    });

  searchInput.addEventListener('input', applyFilters);
  categorySelect.addEventListener('change', applyFilters);
}

renderNavbar();
loadCategories();
loadRecipes();
wireFilters();
