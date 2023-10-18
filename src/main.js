import '@/assets/reset.scss'
import '@/assets/fonts/gilroy/stylesheet.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
const app = createApp(App)

app.use(router).use(store).mount('#app')
