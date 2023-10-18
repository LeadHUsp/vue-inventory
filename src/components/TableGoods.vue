<template>
  <div class="table">
    <div class="table__head">
      <ButtonBase class="table__add" :variant="'secondary'">Добавить товар</ButtonBase>
    </div>
    <div class="table__body" v-if="productPaginated.length > 0">
      <table class="table__component">
        <tr>
          <th class="table__td table__td_type_heading">Название товара</th>
          <th class="table__td table__td_type_heading">Категория товара</th>
          <th class="table__td table__td_type_heading">Цена</th>
          <th class="table__td table__td_type_heading">Количество</th>
          <th class="table__td table__td_type_heading">Фото</th>
          <th class="table__td table__td_type_heading"></th>
        </tr>
        <tr v-for="product in productPaginated" :key="product.id">
          <td class="table__td">{{ product.title }}</td>
          <td class="table__td">{{ product.category }}</td>
          <td class="table__td">{{ product.price }}</td>
          <td class="table__td">{{ product.quantity }}</td>
          <td class="table__td table__td_type_img">
            <span class="table__picture">
              <img class="table__img" :src="product.photo" :alt="product.title" />
            </span>
          </td>
          <td class="table__td table__td_type_actions">
            <div class="table__actions">
              <IconBtn class="table__btn table__btn_fill_green">
                <EditIcon />
              </IconBtn>
              <IconBtn class="table__btn table__btn_fill_red">
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
      <ButtonBase class="table__create" :variant="'primary'">Заполнить данными</ButtonBase>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
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
    PaginationBase
  },
  setup() {
    const store = useStore()
    const products = computed(() => store.state.product.products)
    const limit = computed(() => store.state.product.limit)
    const currentPage = computed(() => store.state.product.page)
    const totalPages = computed(() => store.state.product.totalPages)

    const setTotalPages = () => {
      store.commit('product/setTotalPages', Math.ceil(products.value.length / 2))
    }

    const productPaginated = computed(() =>
      products.value.filter((item, index) => {
        if (currentPage.value === 1) {
          return index >= currentPage.value - 1 && index < currentPage.value * limit.value
        } else {
          return (
            index >= (currentPage.value - 1) * limit.value &&
            index < currentPage.value * limit.value
          )
        }
      })
    )

    onMounted(setTotalPages)
    const changePage = (page) => {
      store.commit('product/setPage', page)
      // store.commit('product/setPage', page)
    }
    return {
      productPaginated,
      changePage,
      totalPages,
      currentPage
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  max-width: 1400px;
  // overflow-x: scroll;
  &__component {
    width: 100%;
  }
  &__pagination {
    padding: 10px 0;
  }
  &__head {
    padding: 10px 0;
    text-align: right;
  }
  &__td {
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
    width: auto;
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
    // width: 300px;
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
