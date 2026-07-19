import { supabase } from './supabaseClient.js';

export async function getFavoritesForUser(userId) {
  const { data, error } = await supabase
    .from('favorites')
    .select('recipe_id, recipes(*, profiles(username))')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
}

export async function isFavorite(userId, recipeId) {
  const { data, error } = await supabase
    .from('favorites')
    .select('recipe_id')
    .eq('user_id', userId)
    .eq('recipe_id', recipeId)
    .maybeSingle();
  if (error) throw error;
  return !!data;
}

export async function addFavorite(userId, recipeId) {
  const { error } = await supabase.from('favorites').insert({ user_id: userId, recipe_id: recipeId });
  if (error) throw error;
}

export async function removeFavorite(userId, recipeId) {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('recipe_id', recipeId);
  if (error) throw error;
}
