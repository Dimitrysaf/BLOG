import { ref, reactive } from 'vue';
import { supabase } from './supabase';
import notificationService from './notification';

// This flag is essential to prevent a race condition where a `SIGNED_IN` event fires immediately after `PASSWORD_RECOVERY`.
let isPasswordRecovery = false;

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
    isPasswordRecovery = false; // Reset the flag if the user closes the dialog.
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
 * ΣΩΣΤΗ ΧΡΗΣΗ: Αυτό στέλνει email με magic link για password reset
 * @param {string} email
 * @returns {Promise<void>}
 */
export async function sendPasswordReset(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
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
    isPasswordRecovery = false; // The recovery process is complete, so lower the flag.
    return data;
}

/**
 * ΝΕΟ: Αλλαγή Email
 * Στέλνει confirmation email στο νέο email address
 * Ο χρήστης πρέπει να επιβεβαιώσει και τα δύο emails (παλιό και νέο)
 * @param {string} newEmail - The new email address
 * @returns {Promise<object>}
 */
export async function changeEmail(newEmail) {
  // Set a flag in sessionStorage to indicate an email change is in progress.
  sessionStorage.setItem('emailChangeInProgress', 'true');
  
  const { data, error } = await supabase.auth.updateUser({ email: newEmail });
  
  if (error) {
    sessionStorage.removeItem('emailChangeInProgress'); // Clear the flag on error
    throw error;
  }
  
  notificationService.push('Στάλθηκε ένα email στην παλιά σας διεύθυνση. Κάντε κλικ στον σύνδεσμο για να συνεχίσετε.');
  return data;
}

/**
 * ΝΕΟ: Reauthentication με OTP Email
 * ΣΩΣΤΗ ΧΡΗΣΗ: Χρησιμοποιεί signInWithOtp για να στείλει OTP email
 * Αυτό είναι το σωστό τρόπο για reauthentication με email verification
 * @returns {Promise<void>}
 */
export async function sendReauthenticationOtp() {
  if (!user.value) {
    throw new Error('User not authenticated.');
  }

  // ΣΩΣΤΟΣ τρόπος: signInWithOtp στέλνει OTP email
  const { error } = await supabase.auth.signInWithOtp({
    email: user.value.email,
    options: {
      shouldCreateUser: false, // Σημαντικό: δεν θέλουμε να δημιουργήσει νέο user
    }
  });

  if (error) {
    throw error;
  }
}

/**
 * ΝΕΟ: Επιβεβαίωση OTP για reauthentication
 * Χρησιμοποιείται για επιβεβαίωση του OTP που στάλθηκε με email
 * @param {string} otpToken - The OTP token from email
 * @returns {Promise<object>}
 */
export async function verifyReauthenticationOtp(otpToken) {
  if (!user.value) {
    throw new Error('User not authenticated.');
  }

  const { data, error } = await supabase.auth.verifyOtp({
    email: user.value.email,
    token: otpToken,
    type: 'email'
  });

  if (error) throw error;
  return data;
}

/**
 * ΕΝΑΛΛΑΚΤΙΚΗ ΛΥΣΗ: Reauthentication με Password
 * Αν προτιμάς να ζητάς τον κωδικό αντί για OTP
 * @param {string} password - The user's current password
 * @returns {Promise<object>}
 */
export async function reauthenticateWithPassword(password) {
  if (!user.value) {
    throw new Error('User not authenticated.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.value.email,
    password: password
  });

  if (error) throw error;
  return data;
}

/**
 * ΝΕΟ: Ελέγχει αν η τρέχουσα session χρειάζεται reauthentication
 * Χρήσιμο για sensitive operations
 * @returns {boolean}
 */
export function needsReauthentication() {
  if (!session.value) return true;
  
  // Ελέγχουμε αν η session είναι παλιά (π.χ. > 5 λεπτά)
  const sessionAge = Date.now() - new Date(session.value.created_at).getTime();
  const FIVE_MINUTES = 5 * 60 * 1000;
  
  return sessionAge > FIVE_MINUTES;
}

/**
 * ΝΕΟ: Resend Email Verification
 * Για χρήστες που δεν έχουν επιβεβαιώσει το email τους
 * @returns {Promise<void>}
 */
export async function resendEmailVerification() {
  if (!user.value) {
    throw new Error('User not authenticated.');
  }

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: user.value.email,
    options: {
      emailRedirectTo: window.location.origin
    }
  });

  if (error) throw error;
}


// --- Auth URL Handling (Run once on app load) ---

function handleAuthURLs() {
  const hash = window.location.hash;

  // 1. Intermediate email change confirmation (from old email)
  if (hash.includes('message=Confirmation link accepted')) {
    notificationService.push('Υπέροχα, επιβεβαιώθηκε ότι είστε εσείς! Τώρα ελέγξτε το νέο σας email και πατήστε τον σύνδεσμο για επιβεβαίωση.');
    // Clean the hash from the URL
    window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
  }
}

handleAuthURLs();

// --- Auth State Management ---

supabase.auth.onAuthStateChange((event, newSession) => {
  if (event === 'PASSWORD_RECOVERY') {
    isPasswordRecovery = true; // Raise the flag to enter recovery mode.
    if (window.location.hash.includes('type=recovery')) {
      openResetPasswordDialog();
      window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
    return; // Stop processing to prevent the temporary session from being set.
  }
  
  // If in recovery mode, ignore any SIGNED_IN events that are not user-initiated.
  if (isPasswordRecovery && event === 'SIGNED_IN') {
    return; // This is the crucial step to prevent the auto-login.
  }

  // Proceed with normal auth state changes for all other events.
  const wasLoggedIn = !!user.value;
  session.value = newSession;
  user.value = newSession?.user ?? null;
  const isLoggedIn = !!user.value;

  if (event === 'SIGNED_IN' && isLoggedIn && !wasLoggedIn) {
    const username = user.value.user_metadata?.username || user.value.email;
    notificationService.push(`Συνδεθήκατε ως ${username}`);
  } else if (event === 'SIGNED_OUT' && !isLoggedIn && wasLoggedIn) {
    notificationService.push('Αποσυνδεθήκατε.');
  } else if (event === 'USER_UPDATED') {
    // Manually update the user ref to ensure UI reactivity
    user.value = newSession.user;
    console.log('User updated:', user.value);
    
    // Check if an email change was in progress
    if (sessionStorage.getItem('emailChangeInProgress') === 'true') {
      notificationService.push('Το email σας άλλαξε με επιτυχία!');
      sessionStorage.removeItem('emailChangeInProgress'); // Clean up the flag
    }
  }

  closeAuthDialog();
  closeRegisterDialog();
  closeForgotPasswordDialog();
});
