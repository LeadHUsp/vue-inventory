<template>
  <button
    class="btn-base"
    :class="[
      {
        'btn-base_secondary': variant === 'secondary'
      },
      {
        'btn-base_primary': variant === 'primary'
      }
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      validator(value) {
        return ['primary', 'secondary'].includes(value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-base {
  width: 100%;
  display: inline-block;
  padding: 12px 30px;
  font-weight: 600;
  border-radius: 10px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  &_secondary {
    background-color: $secondary;
    color: $primary;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: $secondary-hover;
      }
    }
  }
  &_primary {
    background-color: $primary;
    color: #fff;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: $secondary;
      }
    }
  }
}
</style>
