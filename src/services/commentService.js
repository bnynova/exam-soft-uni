import { supabase } from './supabaseClient.js';

export async function getCommentsForRecipe(recipeId) {
  const { data, error } = await supabase
    .from('comments')
    .select('*, profiles(username)')
    .eq('recipe_id', recipeId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

export async function addComment(recipeId, userId, content) {
  const { data, error } = await supabase
    .from('comments')
    .insert({ recipe_id: recipeId, user_id: userId, content })
    .select('*, profiles(username)')
    .single();
  if (error) throw error;
  return data;
}

export async function deleteComment(id) {
  const { error } = await supabase.from('comments').delete().eq('id', id);
  if (error) throw error;
}
