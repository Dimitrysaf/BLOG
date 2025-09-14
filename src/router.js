import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import NotFound from './pages/NotFound.vue';
import User from './pages/User.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/u/:username',
    name: 'User',
    component: User,
    props: route => ({ user: route.meta.userData }),
    async beforeEnter(to, from, next) {
      try {
        const username = to.params.username;
        // This fetch call is to a simple, unauthenticated endpoint to check for user existence.
        const response = await fetch(`/api/user/${username}`);

        if (response.status === 404) {
          // User not found, redirect to the NotFound page.
          next({ name: 'NotFound' });
        } else if (!response.ok) {
          // Another server error occurred.
          throw new Error('Failed to fetch user data');
        } else {
          // User was found. Get the data...
          const userData = await response.json();
          // ...and store it in the route's meta field.
          to.meta.userData = userData;
          // The `props` function above will pass this data to the User.vue component.
          next();
        }
      } catch (error) {
        console.error(error);
        // On any exception, redirect to the NotFound page for safety.
        next({ name: 'NotFound' });
      }
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
