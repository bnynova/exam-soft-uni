import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import '../styles/main.css';

import { renderNavbar } from '../components/navbar.js';
// import { getRecipeById, deleteRecipe } from '../services/recipeService.js';
// import { getCommentsForRecipe, addComment } from '../services/commentService.js';
// import { isFavorite, addFavorite, removeFavorite } from '../services/favoriteService.js';
// import { getSession, getCurrentProfile } from '../services/authService.js';
// import { showToast } from '../utils/toast.js';

renderNavbar();

const recipeId = new URLSearchParams(window.location.search).get('id');

// TODO (build this with Copilot, step by step):
// 1. If !recipeId, show an error / redirect to home.
// 2. Fetch the recipe with getRecipeById(recipeId) and render it into #recipe-detail.
// 3. Fetch the logged-in user/profile; if it's the owner or an admin, render
//    Edit (-> /pages/recipe-form.html?id=...) and Delete buttons.
// 4. Render a favorite/unfavorite toggle button (only if logged in) using
//    isFavorite/addFavorite/removeFavorite.
// 5. Load and render comments into #comments-list via getCommentsForRecipe.
// 6. Wire #comment-form submit -> addComment(recipeId, userId, text), then
//    re-render the comments list.
console.log('recipe-detail.js loaded for recipe', recipeId);
