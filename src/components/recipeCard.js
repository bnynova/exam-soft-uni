import { formatDate } from '../utils/formatters.js';

/** Returns an HTML string for one recipe card. Used by the home feed and profile pages. */
export function recipeCardTemplate(recipe) {
  const image = recipe.image_url || 'https://placehold.co/400x240?text=Recipe';
  return `
    <div class="col-sm-6 col-lg-4">
      <a href="/pages/recipe-detail.html?id=${recipe.id}" class="text-decoration-none text-body">
        <div class="card h-100 recipe-card shadow-sm">
          <img src="${image}" class="card-img-top" alt="${recipe.title}">
          <div class="card-body">
            <h5 class="card-title">${recipe.title}</h5>
            <p class="card-text text-muted small mb-1">${recipe.categories?.name ?? ''}</p>
            <p class="card-text small">By ${recipe.profiles?.username ?? 'unknown'} · ${formatDate(recipe.created_at)}</p>
          </div>
        </div>
      </a>
    </div>`;
}
