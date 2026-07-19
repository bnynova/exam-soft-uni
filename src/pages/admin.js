import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import '../styles/main.css';

import { renderNavbar } from '../components/navbar.js';
import { requireAdmin } from '../utils/guard.js';
// import { supabase } from '../services/supabaseClient.js';
// import { deleteRecipe } from '../services/recipeService.js';
// import { deleteComment } from '../services/commentService.js';

renderNavbar();
const adminProfile = await requireAdmin(); // redirects non-admins away

// TODO (build this with Copilot, step by step):
// 1. Users tab: supabase.from('profiles').select('*') -> table with a
//    "make admin" / "revoke admin" button that updates the role column
//    (allowed by the profiles_update_own_or_admin RLS policy).
// 2. Recipes tab: supabase.from('recipes').select('*, profiles(username)')
//    -> table with a delete button per row (deleteRecipe(id), allowed for
//    admins by the recipes_delete_own_or_admin policy).
// 3. Comments tab: supabase.from('comments').select('*, profiles(username), recipes(title)')
//    -> table with a delete button per row (deleteComment(id)).
// 4. Wire the three tab buttons to swap which table renders into #admin-content.
console.log('admin.js loaded for admin', adminProfile.username);
