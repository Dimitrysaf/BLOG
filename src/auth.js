
import { reactive, readonly } from 'vue';
import notificationService from './notification';

const state = reactive({
  isLoggedIn: false,
  user: null
});

// Check for a token in local storage to initialize the state
const token = localStorage.getItem('authToken');
if (token) {
  state.isLoggedIn = true;
}

const setLoggedIn = (user, token) => {
  state.isLoggedIn = true;
  state.user = user;
  localStorage.setItem('authToken', token);
  // The type has been removed to allow the cdx-message to use its default 'notice' type
  notificationService.push(`Έχετε συνδεθεί ως χρήστης: ${user.username}`);
};

const setLoggedOut = () => {
  state.isLoggedIn = false;
  state.user = null;
  localStorage.removeItem('authToken');
  // The type has been removed to allow the cdx-message to use its default 'notice' type
  notificationService.push('Έχετε αποσυνδεθεί.');
};

export default {
  state: readonly(state),
  setLoggedIn,
  setLoggedOut
};
