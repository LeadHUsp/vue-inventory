<template>
  <div class="txt-field">
    <label v-if="label" class="txt-field__label">{{ label }}</label>
    <input
      class="txt-field__input"
      :class="{ error: !!errorMessage }"
      :name="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />
    <div class="txt-field__helper" v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { toRef } from 'vue'
import { useField } from 'vee-validate'
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  value: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  successMessage: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const name = toRef(props, 'name')
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange
} = useField(name, undefined, {
  initialValue: props.value
})
</script>

<style lang="scss" scoped>
.txt-field {
  width: 100%;
  &__label {
    display: block;
    padding-bottom: 5px;
    font-size: 1.2em;
    font-weight: 500;
  }
  &__input {
    width: 100%;
    padding: 5px 10px;
    height: 50px;
    border: 1px solid $primary;
    &.error {
      border-color: #ec0606;
    }
  }
  &__helper {
    padding-top: 4px;
  }
}
</style>
