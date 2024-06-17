import { createApp } from 'vue'
import App from './App.vue'

import './assets/styles/main.css'
import 'uno.css'
import { router } from './router'

const app = createApp(App)

app.use(router)
await router.isReady();
app.mount('#app')
