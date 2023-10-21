<template>
  <div class="table">
    <div class="table__head">
      <div class="table__add">
        <RouterLink to="/create">
          <ButtonBase :variant="'secondary'" :tag_name="'span'">Добавить товар</ButtonBase>
        </RouterLink>
      </div>
    </div>
    <div class="table__body" v-if="getProductsPaginated(currentPage, limit).length > 0">
      <table class="table__component">
        <tr>
          <th class="table__td table__td_type_heading">Название товара</th>
          <th class="table__td table__td_type_heading">Категория товара</th>
          <th class="table__td table__td_type_heading">Цена</th>
          <th class="table__td table__td_type_heading">Количество</th>
          <th class="table__td table__td_type_heading">Фото</th>
          <th class="table__td table__td_type_heading"></th>
        </tr>
        <tr v-for="product in getProductsPaginated(currentPage, limit)" :key="product.id">
          <td class="table__td">{{ product.title }}</td>
          <td class="table__td">{{ getCategoryById(product.category)[0].title }}</td>
          <td class="table__td">{{ product.price }}</td>
          <td class="table__td">{{ product.quantity }}</td>
          <td class="table__td table__td_type_img">
            <Swiper class="table__slider" :modules="modules" navigation>
              <SwiperSlide v-for="img in product.photo" :key="img">
                <span class="table__picture">
                  <img class="table__img" :src="img" :alt="product.title" />
                </span>
              </SwiperSlide>
            </Swiper>
          </td>
          <td class="table__td table__td_type_actions">
            <div class="table__actions">
              <RouterLink :to="`/update/${product.id}`" class="table__btn table__btn_fill_green">
                <IconBtn :tag_name="'span'">
                  <EditIcon />
                </IconBtn>
              </RouterLink>

              <IconBtn class="table__btn table__btn_fill_red" @click="deleteProduct(product.id)">
                <DeleteIcon />
              </IconBtn>
            </div>
          </td>
        </tr>
      </table>
      <div class="table__pagination">
        <PaginationBase
          :totalPages="totalPages"
          :currentPage="currentPage"
          @changePage="changePage"
        />
      </div>
    </div>
    <div class="table__fallback" v-else>
      <div class="table__heading">Товары не найдены</div>
      <ButtonBase class="table__create" @click="createMocData" :variant="'primary'"
        >Заполнить данными</ButtonBase
      >
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import { useProductStore } from '@/store/productStore.js'
import EditIcon from '@/components/icons/EditIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import IconBtn from '@/components/ui/IconBtn.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import PaginationBase from '@/components/ui/PaginationBase.vue'

export default {
  components: {
    EditIcon,
    DeleteIcon,
    IconBtn,
    ButtonBase,
    PaginationBase,
    Swiper,
    SwiperSlide
  },
  setup() {
    const store = useProductStore()
    const setProducts = store.setProducts
    const { getProductsPaginated, getCategoryById } = storeToRefs(store)

    const limit = ref(10)
    const currentPage = ref(1)
    const totalPages = ref(1)
    onMounted(() => {
      const data = localStorage.getItem('vue_inventroy_products')
      if (data) {
        const parcedData = JSON.parse(data)
        totalPages.value = Math.ceil(parcedData.length / limit.value)
      }
    })
    const createMocData = () => {
      const data = [
        {
          id: 'vv-1',
          title: 'Product-1',
          description: 'nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet',
          category: 'vc-1',
          price: '200',
          quantity: '10',
          photo: [
            'https://catherineasquithgallery.com/uploads/posts/2021-03/1614672563_6-p-sportivnii-inventar-fon-6.jpg',
            'https://catherineasquithgallery.com/uploads/posts/2021-03/1614672563_6-p-sportivnii-inventar-fon-6.jpg'
          ]
        },
        {
          id: 'vv-2',
          title: 'Product-2',
          description: 'nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet',
          category: 'vc-1',
          price: '200',
          quantity: '10',
          photo: [
            'https://catherineasquithgallery.com/uploads/posts/2021-03/1614672563_6-p-sportivnii-inventar-fon-6.jpg',
            'https://catherineasquithgallery.com/uploads/posts/2021-03/1614672563_6-p-sportivnii-inventar-fon-6.jpg'
          ]
        },
        {
          id: 'vv-3',
          title: 'Product-3',
          description: 'nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet',
          category: 'vc-1',
          price: '200',
          quantity: '10',
          photo: [
            'https://catherineasquithgallery.com/uploads/posts/2021-03/1614672563_6-p-sportivnii-inventar-fon-6.jpg',
            'https://catherineasquithgallery.com/uploads/posts/2021-03/1614672563_6-p-sportivnii-inventar-fon-6.jpg'
          ]
        },
        {
          id: 'vv-4',
          title: 'Product-4',
          description: 'nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet',
          category: 'vc-1',
          price: '200',
          quantity: '10',
          photo: [
            'https://catherineasquithgallery.com/uploads/posts/2021-03/1614672563_6-p-sportivnii-inventar-fon-6.jpg',
            'https://catherineasquithgallery.com/uploads/posts/2021-03/1614672563_6-p-sportivnii-inventar-fon-6.jpg'
          ]
        },
        {
          id: 'vv-5',
          title: 'Product-5',
          description: 'nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet',
          category: 'vc-1',
          price: '200',
          quantity: '10',
          photo: [
            'https://catherineasquithgallery.com/uploads/posts/2021-03/1614672563_6-p-sportivnii-inventar-fon-6.jpg',
            'https://catherineasquithgallery.com/uploads/posts/2021-03/1614672563_6-p-sportivnii-inventar-fon-6.jpg'
          ]
        },
        {
          id: 'vv-6',
          title: 'Product-6',
          description: 'nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet',
          category: 'vc-1',
          price: '200',
          quantity: '10',
          photo: [
            'https://catherineasquithgallery.com/uploads/posts/2021-03/1614672563_6-p-sportivnii-inventar-fon-6.jpg',
            'https://catherineasquithgallery.com/uploads/posts/2021-03/1614672563_6-p-sportivnii-inventar-fon-6.jpg'
          ]
        }
      ]
      localStorage.setItem('vue_inventroy_products', JSON.stringify(data))
      setProducts(data)
      totalPages.value = Math.ceil(data.length / limit.value)
    }
    const deleteProduct = (id) => {
      store.deleteProduct(id)
      localStorage.setItem('vue_inventroy_products', JSON.stringify(store.products))
    }
    const changePage = (page) => {
      currentPage.value = page
    }
    return {
      getProductsPaginated,
      changePage,
      limit,
      totalPages,
      currentPage,
      createMocData,
      deleteProduct,
      getCategoryById,
      modules: [Navigation]
    }
  }
}
</script>

<style lang="scss">
.table {
  width: 100%;
  max-width: 1400px;
  &__slider {
    width: 200px;
    .swiper-button-next,
    .swiper-button-prev {
      position: absolute;
      top: 0;
      bottom: 0;
      height: 100%;
      width: 30px;
      background-color: #424242a9;
      transform: none;
      margin-top: 0;
      &:after {
        font-size: 20px;
        color: #fff;
      }
    }
    .swiper-button-next {
      right: 0;
    }
    .swiper-button-prev {
      left: 0;
    }
  }
  &__component {
    width: 100%;
  }
  &__body {
    @media (max-width: 1100px) {
      overflow-x: scroll;
    }
  }
  &__pagination {
    padding: 10px 0;
  }
  &__head {
    padding: 10px 0;
    text-align: right;
  }
  &__td {
    min-width: 110px;
    max-width: 16%;
    padding: 10px;
    border: 1px solid $primary;
    background-color: #fff;
    &_type_heading {
      font-weight: 600;
    }
    &_type_img {
      width: 120px;
    }
    &_type_actions {
      width: 80px;
    }
  }
  &__add {
    max-width: 250px;
    margin-left: auto;
  }
  &__picture {
    display: block;
    position: relative;
    overflow: hidden;
    padding-top: 65%;
  }
  &__img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }
  &__actions {
    display: flex;
    gap: 10px;
  }
  &__create {
    max-width: 250px;
  }
  &__heading {
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 1em;
  }
  &__fallback {
    text-align: center;
  }
  &__btn {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    transition: fill 0.3s ease;
    &_fill_green {
      fill: #62b662;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          fill: $primary;
        }
      }
    }
    &_fill_red {
      fill: #e70808;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          fill: $primary;
        }
      }
    }
  }
}
</style>
