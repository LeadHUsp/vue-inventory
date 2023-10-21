<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { useProductStore } from '@/store/productStore.js'
const store = useProductStore()
onMounted(() => {
  const data = localStorage.getItem('vue_inventroy_products')
  if (data) {
    const parcedData = JSON.parse(data)
    store.setProducts(parcedData)
  }
})
</script>

<template>
  <div class="page">
    <HeaderComponent />
    <div class="page__body">
      <div class="container">
        <RouterView />
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<style lang="scss">
html,
body {
  font-family: 'Gilroy', Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: $primary;
}
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  &__body {
    padding: 30px 0;
    flex-grow: 1;
  }
}
.container {
  width: 100%;
  max-width: 1400px;
  padding: 0 10px;
  margin: 0 auto;
}
.svg {
  display: block;
  width: 100%;
  height: 100%;
  fill: inherit;
}
</style>
