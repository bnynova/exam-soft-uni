import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import '../styles/main.css';

import { renderNavbar } from '../components/navbar.js';
import { requireAuth } from '../utils/guard.js';
// import { getAllCategories } from '../services/categoryService.js';
// import { createRecipe, updateRecipe, getRecipeById } from '../services/recipeService.js';
// import { uploadFile } from '../services/storageService.js';
// import { showToast } from '../utils/toast.js';

renderNavbar();
const session = await requireAuth(); // redirects to login if not authenticated

const recipeId = new URLSearchParams(window.location.search).get('id'); // present when editing

// TODO (build this with Copilot, step by step):
// 1. Populate the #category <select> from getAllCategories().
// 2. If recipeId is set: load the existing recipe with getRecipeById, prefill
//    the form fields, change the heading/button to "Edit recipe" / "Update".
//    Also guard: if session.user.id !== recipe.user_id and not admin, redirect away.
// 3. On submit: if a file was chosen in #image, uploadFile('recipe-images', file, session.user.id)
//    to get an image_url. Then call createRecipe(...) or updateRecipe(id, ...)
//    with { user_id: session.user.id, title, description, ingredients, instructions, image_url, category_id }.
// 4. On success, redirect to /pages/recipe-detail.html?id=<id>.
console.log('recipe-form.js loaded, editing:', recipeId);
