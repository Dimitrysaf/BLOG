// src/main.js

import { createApp } from 'vue'

// 1. Βιβλιοθήκες CSS
import '@wikimedia/codex/dist/codex.style.css'

// 2. Το δικό μας, global CSS (πρέπει να έρχεται μετά τις βιβλιοθήκες για να μπορεί να κάνει override)
import './style.css'

// 3. Components και λογική της εφαρμογής
import App from './App.vue'
import router from './router'
import { installCodex } from './codex' 
import { inject } from '@vercel/analytics';

const app = createApp(App)

installCodex(app) 
app.use(router)

app.mount('#app')

inject();