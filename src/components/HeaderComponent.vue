<template>
  <div class="header">
    <div class="container">
      <div class="header__grid">
        <div class="header__logo">Спортивный инвентарь</div>
        <div class="header__nav">
          <div class="header__item">
            <RouterLink class="header__link" to="/">К списку товаров</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { RouterLink } from 'vue-router'
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 20px 0;
  background-color: $primary;
  color: #fff;
  &__grid {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  &__logo {
    flex-shrink: 0;
    font-weight: bold;
    font-size: 22px;
    text-align: center;
    @media (max-width: 575px) {
      width: 100%;
      font-size: 18px;
    }
  }
  &__nav {
    margin-left: auto;
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 575px) {
      padding-top: 10px;
      width: 100%;
      margin-left: initial;
      justify-content: center;
    }
  }
  &__item {
    padding: 5px;
  }
  &__link {
    padding: 5px;
    font-weight: 600;
    font-size: 18px;
    transition: color 0.3s ease;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: $secondary;
      }
    }
    @media (max-width: 575px) {
      font-size: 16px;
    }
  }
}
</style>
