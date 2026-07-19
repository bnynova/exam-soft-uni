import { supabase } from './supabaseClient.js';

/**
 * Registers a new user and stashes the chosen username in user_metadata so
 * the `handle_new_user` DB trigger can create a matching profiles row.
 */
export async function register(email, password, username) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } },
  });
  if (error) throw error;
  return data;
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

/** Returns the profiles row (id, username, avatar_url, role) for the current user, or null. */
export async function getCurrentProfile() {
  const session = await getSession();
  if (!session) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (error) throw error;
  return data;
}

export async function isAdmin() {
  const profile = await getCurrentProfile();
  return profile?.role === 'admin';
}
