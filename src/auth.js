import { ref, reactive } from 'vue';
import { supabase } from './supabase';
import notificationService from './notification';

// Reactive state for the session and user
export const session = ref(null);
export const user = ref(null);

// Reactive state to control the visibility of all auth-related dialogs
export const authDialogsState = reactive({
  isLoginOpen: false,
  isRegisterOpen: false,
  isForgotPasswordOpen: false,
  isResetPasswordOpen: false,
});

/**
 * Opens the login dialog.
 */
export function openAuthDialog() {
  authDialogsState.isRegisterOpen = false;
  authDialogsState.isForgotPasswordOpen = false;
  authDialogsState.isResetPasswordOpen = false;
  authDialogsState.isLoginOpen = true;
}

/**
 * Opens the register dialog.
 */
export function openRegisterDialog() {
  authDialogsState.isLoginOpen = false;
  authDialogsState.isForgotPasswordOpen = false;
  authDialogsState.isResetPasswordOpen = false;
  authDialogsState.isRegisterOpen = true;
}

/**
 * Opens the forgot password dialog.
 */
export function openForgotPasswordDialog() {
  authDialogsState.isLoginOpen = false;
  authDialogsState.isRegisterOpen = false;
  authDialogsState.isResetPasswordOpen = false;
  authDialogsState.isForgotPasswordOpen = true;
}

/**
 * Opens the reset password dialog.
 */
export function openResetPasswordDialog() {
  authDialogsState.isLoginOpen = false;
  authDialogsState.isRegisterOpen = false;
  authDialogsState.isForgotPasswordOpen = false;
  authDialogsState.isResetPasswordOpen = true;
}

/**
 * Closes the login dialog.
 */
export function closeAuthDialog() {
    authDialogsState.isLoginOpen = false;
}

/**
 * Closes the register dialog.
 */
export function closeRegisterDialog() {
    authDialogsState.isRegisterOpen = false;
}

/**
 * Closes the forgot password dialog.
 */
export function closeForgotPasswordDialog() {
    authDialogsState.isForgotPasswordOpen = false;
}

/**
 * Closes the reset password dialog.
 */
export function closeResetPasswordDialog() {
    authDialogsState.isResetPasswordOpen = false;
}


/**
 * Signs the user in using Google OAuth.
 */
export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) {
    console.error('Error signing in with Google:', error.message);
  }
}

/**
 * Signs the user in using their email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>}
 */
export async function signInWithPassword(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

/**
 * Sends a password reset email to the user.
 * @param {string} email
 * @returns {Promise<void>}
 */
export async function sendPasswordReset(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/?reset=true',
    });
    if (error) {
        // Don't throw the error, just log it. This is to prevent email enumeration.
        console.error('Password reset error:', error.message);
    }
}

/**
 * Signs up a new user with their email, password and metadata.
 * @param {object} credentials - The user's credentials.
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @param {object} [credentials.options] - Additional options for sign-up.
 * @returns {Promise<object>}
 */
export async function signUp({ email, password, options }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options
  });
  if (error) throw error;
  return data;
}

/**
 * Signs the current user out.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
  }
}

/**
 * Updates the current user's data.
 * @param {object} metadata - The user metadata to update.
 * @returns {Promise<object>}
 */
export async function updateUser(metadata) {
  const { data, error } = await supabase.auth.updateUser({
    data: metadata
  });
  if (error) throw error;
  // Manually update the local user ref after a successful update
  user.value = data.user;
  return data;
}

/**
* Updates the user's password.
* @param {string} newPassword - The new password.
* @returns {Promise<object>}
*/
export async function updateUserPassword(newPassword) {
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword
    });
    if (error) throw error;
    return data;
}

export async function sendOtp() {
  if (!user.value) {
    throw new Error('User not authenticated.');
  }

  const { error } = await supabase.auth.reauthenticate();

  if (error) {
    throw error;
  }
}


// --- Auth State Management ---

supabase.auth.getSession().then(({ data }) => {
  session.value = data.session;
  user.value = data.session?.user ?? null;
});

supabase.auth.onAuthStateChange((event, newSession) => {
  const wasLoggedIn = !!user.value;
  session.value = newSession;
  user.value = newSession?.user ?? null;
  const isLoggedIn = !!user.value;

  if (event === 'SIGNED_IN' && isLoggedIn && !wasLoggedIn) {
    const username = user.value.user_metadata?.username || user.value.email;
    notificationService.push(`Συνδεθήκατε ως ${username}`);
  } else if (event === 'SIGNED_OUT' && !isLoggedIn && wasLoggedIn) {
    notificationService.push('Αποσυνδεθήκατε.');
  } else if (event === 'PASSWORD_RECOVERY') {
      openResetPasswordDialog();
  }

  // Automatically close all auth dialogs on successful login/logout/signup
  closeAuthDialog();
  closeRegisterDialog();
  closeForgotPasswordDialog();
});