<template>
  <div class="pager" v-if="totalPages > 1">
    <div class="pager__item" v-for="page in totalPages" :key="page">
      <button
        class="pager__link"
        :class="{
          active: page == currentPage
        }"
        @click="$emit('changePage', page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.pager {
  display: flex;
  justify-content: center;
  margin: 0 -5px;

  &__item {
    padding: 0 5px;
  }
  &__link {
    display: block;
    border: 1px solid $primary;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    transition: all 0.3s ease;
    &.active {
      border-color: $secondary;
      color: $secondary;
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: $secondary;
        color: #fff;
        border-color: $secondary;
      }
    }
  }
}
</style>
