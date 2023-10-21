<template>
  <div class="textarea">
    <label v-if="label" class="textarea__label">{{ label }}</label>
    <textarea
      class="textarea__field"
      :class="{ error: !!errorMessage }"
      :name="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    ></textarea>
    <div class="textarea__helper" v-if="errorMessage">{{ errorMessage }}</div>
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
.textarea {
  width: 100%;
  &__label {
    display: block;
    padding-bottom: 5px;
    font-size: 1.2em;
    font-weight: 500;
  }
  &__field {
    width: 100%;
    padding: 5px 10px;
    min-height: 200px;
    border: 1px solid $primary;
    resize: none;
    &.error {
      border-color: #ec0606;
    }
  }
  &__helper {
    padding-top: 4px;
  }
}
</style>
