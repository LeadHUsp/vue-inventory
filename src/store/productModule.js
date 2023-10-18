export const productModule = {
  state: () => ({
    products: [
      {
        id: 'vv-1',
        title: 'Product-1',
        description: 'nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet',
        category: 'Category-1',
        price: '200',
        quantity: '10',
        photo:
          'https://catherineasquithgallery.com/uploads/posts/2021-03/1614672563_6-p-sportivnii-inventar-fon-6.jpg'
      },
      {
        id: 'vv-2',
        title: 'Product-2',
        description: 'nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet',
        category: 'Category-1',
        price: '200',
        quantity: '10',
        photo:
          'https://catherineasquithgallery.com/uploads/posts/2021-03/1614672563_6-p-sportivnii-inventar-fon-6.jpg'
      },
      {
        id: 'vv-3',
        title: 'Product-3',
        description: 'nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet',
        category: 'Category-1',
        price: '200',
        quantity: '10',
        photo:
          'https://catherineasquithgallery.com/uploads/posts/2021-03/1614672563_6-p-sportivnii-inventar-fon-6.jpg'
      },
      {
        id: 'vv-4',
        title: 'Product-4',
        description: 'nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet',
        category: 'Category-1',
        price: '200',
        quantity: '10',
        photo:
          'https://catherineasquithgallery.com/uploads/posts/2021-03/1614672563_6-p-sportivnii-inventar-fon-6.jpg'
      },
      {
        id: 'vv-5',
        title: 'Product-5',
        description: 'nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet',
        category: 'Category-1',
        price: '200',
        quantity: '10',
        photo:
          'https://catherineasquithgallery.com/uploads/posts/2021-03/1614672563_6-p-sportivnii-inventar-fon-6.jpg'
      },
      {
        id: 'vv-6',
        title: 'Product-6',
        description: 'nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet',
        category: 'Category-1',
        price: '200',
        quantity: '10',
        photo:
          'https://catherineasquithgallery.com/uploads/posts/2021-03/1614672563_6-p-sportivnii-inventar-fon-6.jpg'
      }
    ],
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
    ],
    page: 1,
    totalPages: 1,
    limit: 2
  }),
  getters: {
    getProductsPaginated(state) {
      return [state.products]
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },

    setPage(state, page) {
      state.page = page
    },

    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    }
  },
  actions: {},
  namespaced: true
}
