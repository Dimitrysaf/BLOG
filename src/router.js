import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from './supabase'; // Import supabase client
import { openAuthDialog } from './auth'; // Correctly import the specific function

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/Home.vue'),
  },
  {
    path: '/p/:slug',
    name: 'Post',
    component: () => import('./pages/Post.vue'),
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('./pages/PrivacyPolicies.vue'),
    meta: { 
      title: 'Πολιτική Απορρήτου',
      description: 'Διαβάστε την πολιτική απορρήτου του ιστολογίου για να κατανοήσετε πώς συλλέγονται, χρησιμοποιούνται και προστατεύονται οι πληροφορίες σας.'
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('./pages/Contact.vue'),
    meta: { 
      title: 'Επικοινωνία',
      description: 'Επικοινωνήστε μαζί μας για οποιαδήποτε ερώτηση, πρόταση ή σχόλιο.'
    },
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('./pages/admin/AdminDashboard.vue'),
    meta: { 
      requiresAuth: true, 
      requiredRole: 'admin', 
      title: 'Πίνακας Ελέγχou',
      noindex: true
    },
  },
  {
    path: '/admin/edit/:id',
    name: 'PostEditor',
    component: () => import('./pages/admin/PostEditor.vue'),
    props: true, // Pass route params as props
    meta: { 
      requiresAuth: true, 
      requiredRole: 'admin', 
      title: 'Επεξεργασία Άρθρου',
      noindex: true
    },
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: () => import('./pages/Forbidden.vue'),
    meta: { 
      title: 'Απαγορευμένη Πρόσβαση',
      noindex: true
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./pages/NotFound.vue'),
    meta: { 
      title: 'Η Σελίδα δεν Βρέθηκε',
      noindex: true
    },
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

// After each navigation, update the document title
router.afterEach(async (to) => {
  const baseTitle = 'Το Ιστολόγιο του Δημήτρη';

  if (to.name === 'Home') {
    document.title = baseTitle;
  } else if (to.name === 'Post' && to.params.slug) {
    document.title = `${baseTitle} | Φόρτωση...`; // Set a temporary title
    try {
      const { data: post, error } = await supabase
        .from('posts')
        .select('title')
        .eq('slug', to.params.slug)
        .single();

      if (error) throw error;

      if (post) {
        document.title = `${baseTitle} | ${post.title}`;
      } else {
        // If the post is not found, the NotFound component will be rendered.
        // We can grab the title from its meta.
        const notFoundRoute = router.getRoutes().find(r => r.name === 'NotFound');
        if (notFoundRoute && notFoundRoute.meta.title) {
          document.title = `${baseTitle} | ${notFoundRoute.meta.title}`;
        }
      }
    } catch (err) {
      console.error('Error fetching post title for document title:', err);
      document.title = baseTitle; // Fallback to base title on error
    }
  } else if (to.meta && to.meta.title) {
    document.title = `${baseTitle} | ${to.meta.title}`;
  } else {
    document.title = baseTitle; // Fallback for any other case
  }
});


export default router;
