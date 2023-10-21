import { defineStore } from 'pinia'

export const useProductStore = defineStore('productStore', {
  state: () => {
    return {
      products: [],
      categories: [
        {
          id: 'vc-1',
          title: 'Category-1'
        },
        {
          id: 'vc-2',
          title: 'Category-2'
        },
        {
          id: 'vc-3',
          title: 'Category-3'
        },
        {
          id: 'vc-4',
          title: 'Category-4'
        }
      ]
    }
  },
  getters: {
    getProductsPaginated: (state) => {
      return (page, limit) => {
        return [...state.products].filter((item, index) => {
          if (state.page === 1) {
            return index >= page - 1 && index < page * limit
          } else {
            return index >= (page - 1) * limit && index < page * limit
          }
        })
      }
    },
    getProductById: (state) => {
      return (id) => {
        return [...state.products].filter((item) => item.id === id)
      }
    },
    getCategoryById: (state) => {
      return (id) => {
        return [...state.categories].filter((item) => item.id === id)
      }
    }
  },
  actions: {
    setProducts(data) {
      this.products = data
    },
    deleteProduct(id) {
      this.products = [...this.products].filter((item) => item.id !== id)
    },
    createProduct(data) {
      this.products = [...this.products, data]
    },
    updateProductById(data) {
      this.products = [
        ...this.products.map((el) => {
          if (el.id === data.id) {
            return data
          } else {
            return el
          }
        })
      ]
    }
  }
})
