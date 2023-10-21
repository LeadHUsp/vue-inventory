<script setup>
import EditProductForm from '@/components/EditProductForm.vue'
import { useProductStore } from '@/store/productStore.js'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const store = useProductStore()
const updateProductById = store.updateProductById
const { getProductById } = storeToRefs(store)
const route = useRoute()
const product = getProductById.value(route.params.id)
const updateProduct = (data) => {
  updateProductById(data)
}
</script>

<template>
  <EditProductForm
    v-if="product.length > 0"
    @create_product="updateProduct"
    :edit_data="{ ...product[0] }"
    :products="store.products"
    :categories="store.categories"
  />
  <div class="" v-else>Такой продукт не найден</div>
</template>
<style lang="scss" scoped></style>
