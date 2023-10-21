<script setup>
import EditProductForm from '@/components/EditProductForm.vue'
import { useProductStore } from '@/store/productStore.js'
const store = useProductStore()
const createProduct = (data) => {
  store.createProduct(data)
}
</script>

<template>
  <EditProductForm
    @create_product="createProduct"
    :products="store.products"
    :categories="store.categories"
  />
</template>
<style lang="scss" scoped></style>
