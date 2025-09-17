import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import NotFound from './pages/NotFound.vue';
import User from './pages/User.vue';
import Post from './pages/Post.vue';
import loadingService from './loading';

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
      loadingService.show();
      try {
        const username = to.params.username;
        const response = await fetch(`/api/user/${username}`);

        if (response.status === 404) {
          next({ name: 'NotFound' });
        } else if (!response.ok) {
          throw new Error('Failed to fetch user data');
        } else {
          const userData = await response.json();
          to.meta.userData = userData;
          next();
        }
      } catch (error) {
        console.error(error);
        next({ name: 'NotFound' });
      } finally {
        loadingService.hide();
      }
    },
  },
  {
    path: '/p/:slug',
    name: 'Post',
    component: Post,
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
