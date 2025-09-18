
import { reactive, readonly } from 'vue';
import notificationService from './notification';
import loadingService from './loading';

const state = reactive({
  isLoggedIn: false,
  user: null,
  isAuthReady: false, // Flag to indicate if the initial session check is complete
});

/**
 * Checks the user's session by calling the /api/me endpoint.
 * This is the correct way to determine login status when using HttpOnly cookies.
 */
const checkSession = async () => {
  // If the initial authentication check has already been completed, don't do it again.
  if (state.isAuthReady) {
    return;
  }

  try {
    const response = await fetch('/api/me');
    if (response.ok) {
      const { user } = await response.json();
      setLoggedIn(user);
    } else {
      // The user is not logged in or the token is invalid
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem('user');
    }
  } catch (error) {
    console.error('Session check failed:', error);
    state.isLoggedIn = false;
    state.user = null;
    localStorage.removeItem('user');
  } finally {
    state.isAuthReady = true; // The check is complete, the app can now render
  }
};

/**
 * Updates the state when a user successfully logs in.
 * The HttpOnly cookie is set by the server, not here.
 */
const setLoggedIn = (user) => {
  state.isLoggedIn = true;
  state.user = user;
  // We can still use localStorage for non-sensitive data for quick UI updates.
  localStorage.setItem('user', JSON.stringify(user));
  notificationService.push(`You are logged in as: ${user.username}`);
};

/**
 * Logs the user out by calling the /api/logout endpoint to clear the HttpOnly cookie.
 */
const setLoggedOut = async () => {
  loadingService.show();
  try {
    await fetch('/api/logout', { method: 'POST' });
  } catch (error) {
    console.error('Logout API call failed:', error);
  } finally {
    state.isLoggedIn = false;
    state.user = null;
    localStorage.removeItem('user');
    loadingService.hide();
    notificationService.push('You have been logged out.');
  }
};

const updateUser = (user) => {
  if (state.isLoggedIn) {
    state.user = { ...state.user, ...user };
    localStorage.setItem('user', JSON.stringify(state.user));
    notificationService.push('Your profile has been updated.');
  }
};

export default {
  state: readonly(state),
  checkSession,
  setLoggedIn,
  setLoggedOut,
  updateUser
};
