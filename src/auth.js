
import { reactive, readonly } from 'vue';
import notificationService from './notification';

const state = reactive({
  isLoggedIn: false,
  user: null
});

// CORRECTED: On startup, retrieve the user data from localStorage, not just the token.
const token = localStorage.getItem('authToken');
const storedUser = localStorage.getItem('user');

if (token && storedUser) {
  state.isLoggedIn = true;
  // Parse the stored user data and restore it to the application state.
  state.user = JSON.parse(storedUser);
}

const setLoggedIn = (user, token) => {
  state.isLoggedIn = true;
  state.user = user;
  localStorage.setItem('authToken', token);
  // CORRECTED: Store the user object in localStorage to persist it across page loads.
  localStorage.setItem('user', JSON.stringify(user));
  notificationService.push(`Έχετε συνδεθεί ως χρήστης: ${user.username}`);
};

const setLoggedOut = () => {
  state.isLoggedIn = false;
  state.user = null;
  localStorage.removeItem('authToken');
  // CORRECTED: Remove the user object from localStorage on logout.
  localStorage.removeItem('user');
  notificationService.push('Έχετε αποσυνδεθεί.');
};

export default {
  state: readonly(state),
  setLoggedIn,
  setLoggedOut
};
