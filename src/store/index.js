import { createStore } from 'vuex'
import { productModule } from '@/store/productModule'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // Не меняем состояния, но можем вызывать мутации. Подходят для сайд эффектов
  },
  modules: {
    product: productModule
  }
})
