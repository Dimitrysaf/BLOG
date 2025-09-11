import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Services from './pages/Services.vue';
import NotFound from './pages/NotFound.vue';
import { federationData } from './composables/federationData.ts';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Αρχική - Ομοσπονδιακή Πύλη της Ελλάδας',
      favicon: '/src/assets/Coat_of_arms_of_Greece.svg'
    }
  },
  {
    path: '/:ministry_name',
    name: 'Ministry',
    component: Services,
    beforeEnter: (to, from, next) => {
      const path = `/${to.params.ministry_name}`;
      const ministry = federationData.find(m => m.link === path);
      if (ministry) {
        to.meta = { ...to.meta, title: `${ministry.title} - Ομοσπονδιακή Πύλη της Ελλάδας`, favicon: ministry.thumbnail };
        next();
      } else {
        next({ name: 'NotFound' });
      }
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'Σελίδα δεν βρέθηκε - Ομοσπονδιακή Πύλη της Ελλάδας',
      favicon: '/src/assets/Coat_of_arms_of_Greece.svg'
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
