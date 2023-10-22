<script setup>
import { useProductStore } from '@/store/productStore.js'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

const store = useProductStore()
const { getProductById, getCategoryById } = storeToRefs(store)
const route = useRoute()
const product = getProductById.value(route.params.id)[0]
const modules = [Navigation]
</script>

<template>
  <div class="product-page" v-if="product">
    <div class="product-page__title">{{ product.title }}</div>
    <div class="product-page__grid">
      <div class="product-page__gallery">
        <Swiper :modules="modules" navigation>
          <SwiperSlide v-for="img in product.photo" :key="img">
            <span class="table__picture">
              <img class="table__img" :src="img" :alt="product.title" />
            </span>
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="product-page__descr">
        <div class="product-page__info">
          Категория: {{ getCategoryById(product.category)[0].title }}
        </div>
        <div class="product-page__info">Количество: {{ product.quantity }}</div>
        <div class="product-page__info">Цена: {{ product.price }}</div>
      </div>
    </div>
  </div>
  <div class="" v-else>Такой продукт не найден</div>
</template>

<style lang="scss" scoped>
.product-page {
  &__title {
    font-size: 27px;
    font-weight: bold;
    padding-bottom: 20px;
  }
  &__grid {
    display: flex;
    flex-wrap: wrap;
  }
  &__gallery {
    width: 40%;
  }
  &__descr {
    width: 60%;
    padding-left: 30px;
  }
  &__info {
    padding: 15px 0;
    font-size: 18px;
    font-weight: 500;
  }
  @media (max-width: 768px) {
    &__gallery {
      width: 50%;
    }
    &__descr {
      width: 50%;
    }
  }
  @media (max-width: 575px) {
    &__gallery {
      width: 100%;
    }
    &__descr {
      width: 100%;
      padding-left: 0;
      padding-top: 20px;
    }
  }
}
</style>
