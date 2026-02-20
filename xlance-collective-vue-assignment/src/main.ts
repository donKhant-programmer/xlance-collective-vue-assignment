import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import global CSS (Tailwind)
import './assets/main.css'

// Create and mount the app
createApp(App)
  .use(router)
  .mount('#app')