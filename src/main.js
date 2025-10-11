// src/main.js

import { createApp } from 'vue'
import './style.css'
import '@wikimedia/codex/dist/codex.style.css'
import App from './App.vue'
import router from './router'
import { installCodex } from './codex' 

const app = createApp(App)

installCodex(app) 
app.use(router)

app.mount('#app')