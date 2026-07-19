import { supabase } from './supabaseClient.js';

/**
 * Fetch recipes with the author's username and category name joined in.
 * @param {{ search?: string, categoryId?: number }} filters
 */
export async function getAllRecipes(filters = {}) {
  let query = supabase
    .from('recipes')
    .select('*, profiles(username), categories(name)')
    .order('created_at', { ascending: false });

  if (filters.search) {
    query = query.ilike('title', `%${filters.search}%`);
  }
  if (filters.categoryId) {
    query = query.eq('category_id', filters.categoryId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getRecipeById(id) {
  const { data, error } = await supabase
    .from('recipes')
    .select('*, profiles(username), categories(name)')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function getRecipesByUser(userId) {
  const { data, error } = await supabase
    .from('recipes')
    .select('*, categories(name)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createRecipe(recipe) {
  const { data, error } = await supabase.from('recipes').insert(recipe).select().single();
  if (error) throw error;
  return data;
}

export async function updateRecipe(id, updates) {
  const { data, error } = await supabase
    .from('recipes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteRecipe(id) {
  const { error } = await supabase.from('recipes').delete().eq('id', id);
  if (error) throw error;
}
