import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import UpdateProduct from '@/views/UpdateProduct.vue'
import CreateProduct from '@/views/CreateProduct.vue'
import ProductPage from '@/views/ProductPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product/:id',
      name: 'product_page',
      component: ProductPage
    },
    {
      path: '/update/:id',
      name: 'update',
      component: UpdateProduct
    },
    {
      path: '/create',
      name: 'create',
      component: CreateProduct
    }
  ]
})

export default router
