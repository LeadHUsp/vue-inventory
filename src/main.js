import '@/assets/reset.scss'
import '@/assets/fonts/gilroy/stylesheet.css'
import 'swiper/scss'
import 'swiper/scss/navigation'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)

app.use(router).use(createPinia()).mount('#app')
