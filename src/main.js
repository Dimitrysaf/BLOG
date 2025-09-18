import { createApp } from 'vue'
import './style.css'
import '@wikimedia/codex/dist/codex.style.css'
import App from './App.vue'
import router from './router'
import auth from './auth'

// Call checkSession to restore the user's session from the secure HttpOnly cookie.
// The app will only be mounted after this check is complete.
auth.checkSession().then(() => {
  const app = createApp(App)
  app.use(router)
  app.mount('#app')
});
