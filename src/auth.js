
import { reactive, readonly } from 'vue';
import notificationService from './notification';
import loadingService from './loading';

const state = reactive({
  isLoggedIn: false,
  user: null
});

const token = localStorage.getItem('authToken');
const storedUser = localStorage.getItem('user');

if (token && storedUser) {
  state.isLoggedIn = true;
  state.user = JSON.parse(storedUser);
}

const setLoggedIn = (user, token) => {
  state.isLoggedIn = true;
  state.user = user;
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(user));
  notificationService.push(`Έχετε συνδεθεί ως χρήστης: ${user.username}`);
};

const setLoggedOut = async () => {
  loadingService.show();

  // Simulate an async operation like an API call
  await new Promise(resolve => setTimeout(resolve, 500));

  state.isLoggedIn = false;
  state.user = null;
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');

  loadingService.hide();
  notificationService.push('Έχετε αποσυνδεθεί.');
};

const updateUser = (user) => {
  if (state.isLoggedIn) {
    state.user = { ...state.user, ...user };
    localStorage.setItem('user', JSON.stringify(state.user));
    notificationService.push('Το προφίλ σας ενημερώθηκε.');
  }
};

export default {
  state: readonly(state),
  setLoggedIn,
  setLoggedOut,
  updateUser
};
