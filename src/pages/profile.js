import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import '../styles/main.css';

import { renderNavbar } from '../components/navbar.js';
import { requireAuth } from '../utils/guard.js';
// import { getCurrentProfile } from '../services/authService.js';
// import { getRecipesByUser } from '../services/recipeService.js';
// import { getFavoritesForUser } from '../services/favoriteService.js';
// import { recipeCardTemplate } from '../components/recipeCard.js';
// import { uploadFile } from '../services/storageService.js';

renderNavbar();
const session = await requireAuth();

// TODO (build this with Copilot, step by step):
// 1. Load the current profile and render avatar + username into #profile-header,
//    plus a small file input to upload a new avatar (uploadFile('avatars', ...)
//    then update the profiles row with the new avatar_url).
// 2. Default to showing "My recipes" tab: getRecipesByUser(session.user.id),
//    render with recipeCardTemplate into #recipe-grid.
// 3. Wire #tab-favorites click -> getFavoritesForUser(session.user.id) -> render
//    (note the shape is [{ recipe_id, recipes: {...} }], map to recipes before
//    passing to recipeCardTemplate). Toggle the `active` class between tabs.
console.log('profile.js loaded for user', session.user.id);
