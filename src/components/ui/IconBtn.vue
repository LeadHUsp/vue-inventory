<template>
  <component :is="tag_name" class="icon-btn"><slot></slot></component>
</template>

<script>
export default {
  props: {
    tag_name: {
      type: String,
      default: 'button'
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-btn {
  display: block;
}
</style>
