import { supabase } from './supabaseClient.js';

/**
 * Uploads a file to a Storage bucket and returns its public URL.
 * Create the buckets in the Supabase dashboard first: `recipe-images`, `avatars` (public read).
 * @param {'recipe-images'|'avatars'} bucket
 * @param {File} file
 * @param {string} pathPrefix e.g. the user id, to namespace files per user
 */
export async function uploadFile(bucket, file, pathPrefix) {
  const ext = file.name.split('.').pop();
  const path = `${pathPrefix}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file);
  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
