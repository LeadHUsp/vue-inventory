<template>
  <div class="dialog" v-if="props.show" @click.stop="hideDialog">
    <div class="dialog__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['update:show'])
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
    required: true
  }
})

const hideDialog = () => {
  emits('update:show', false)
}
</script>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #00000056;
  position: fixed;
  display: flex;
}
.dialog__content {
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  min-height: 1px;
  width: 100%;
  max-width: 350px;
  padding: 15px;
}
</style>
