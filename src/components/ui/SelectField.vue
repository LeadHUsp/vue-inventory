<template>
  <div class="select-field">
    <label v-if="label" class="select-field__label">{{ label }}</label>
    <select
      class="select-field__input"
      :class="{ error: !!errorMessage }"
      :name="name"
      :value="inputValue"
      :placeholder="placeholder"
      @change="handleChange"
      @blur="handleBlur"
    >
      <option v-for="option in options" :value="option.value" :key="option.id">
        {{ option.title }}
      </option>
    </select>
    <div class="select-field__helper" v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { toRef } from 'vue'
import { useField } from 'vee-validate'
const props = defineProps({
  options: {
    type: Array,
    required: true
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
.select-field {
  width: 100%;
  &__label {
    display: block;
    padding-bottom: 5px;
    font-size: 1.2em;
    font-weight: 500;
  }
  &__input {
    appearance: auto;
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
