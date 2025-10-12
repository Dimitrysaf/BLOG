import { ref } from 'vue';
import { supabase } from './supabase';

export const isCompleteProfileDialogOpen = ref(false);

export function openCompleteProfileDialog() {
  isCompleteProfileDialogOpen.value = true;
}

export function closeCompleteProfileDialog() {
  isCompleteProfileDialogOpen.value = false;
}

/**
 * Checks the user's profile for a full_name.
 * If the full_name is missing, it opens the completion dialog.
 * @param {object} user - The user object from Supabase auth.
 */
export async function checkUserProfile(user) {
  if (!user) return;

  // First, check the user_metadata which is available immediately
  if (user.user_metadata && user.user_metadata.full_name) {
    return; // Name exists, do nothing
  }

  // If not in metadata, check the 'profiles' table as a fallback
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single();

    if (error) throw error;

    // If the profile exists but full_name is null, empty, or doesn't exist
    if (!data || !data.full_name) {
      openCompleteProfileDialog();
    }

  } catch (error) {
    // This might happen if the profile row hasn't been created yet by the trigger.
    // In a race condition, it's safer to assume the name is missing and open the dialog.
    console.warn('Could not definitively check profile, proceeding to ask for name:', error.message);
    openCompleteProfileDialog();
  }
}
