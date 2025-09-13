import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import NotFound from './pages/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Αρχική - Ιστολόγιο',
      favicon: ''
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'Σελίδα δεν βρέθηκε - Ιστολόγιο',
      favicon: ''
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ el: to.hash, behavior: 'smooth' });
        }, 300);
      });
    }

    return { top: 0 };
  },
});

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon && to.meta.favicon) {
    favicon.setAttribute('href', to.meta.favicon);
  }
});

export default router;
