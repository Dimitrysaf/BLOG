import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from './supabase'; // Import supabase client
import { openAuthDialog } from './auth'; // Correctly import the specific function

import Home from './pages/Home.vue';
import NotFound from './pages/NotFound.vue';
import Post from './pages/Post.vue';
import AdminDashboard from './pages/admin/AdminDashboard.vue';
import Forbidden from './pages/Forbidden.vue';

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
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiredRole: 'admin' },
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: Forbidden,
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

// Centralized Navigation Guard
router.beforeEach(async (to, from, next) => {
  // Wait for the user session to be loaded
  const { data: { session } } = await supabase.auth.getSession();
  const currentUser = session?.user;

  if (to.meta.requiresAuth) {
    if (!currentUser) {
      // Not authenticated, redirect to home and trigger login
      console.log('User not authenticated. Redirecting to Home.');
      openAuthDialog(); // Call the imported function directly
      return next({ name: 'Home' });
    }

    // User is authenticated, check for role
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', currentUser.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data && data.role === to.meta.requiredRole) {
        // User has the required role, allow access
        console.log('User has required role. Access granted.');
        return next();
      } else {
        // User does not have the required role, redirect to forbidden page
        console.log('User does not have required role. Redirecting to Forbidden.');
        return next({ name: 'Forbidden' });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return next({ name: 'Forbidden' }); // Redirect on error for security
    }

  } else {
    // Route does not require auth, allow access
    next();
  }
});

export default router;
