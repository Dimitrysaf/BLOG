import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import NotFound from './pages/NotFound.vue';
import Post from './pages/Post.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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