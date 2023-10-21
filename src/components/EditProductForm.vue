<script setup>
import { onMounted } from 'vue'
import { useForm, FieldArray } from 'vee-validate'
import * as yup from 'yup'
import { v4 as uuid } from 'uuid'
import TextField from '@/components/ui/TextField.vue'
import TextArea from '@/components/ui/TextArea.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import SelectField from '@/components/ui/SelectField.vue'

const props = defineProps({
  edit_data: {
    type: Object
  },
  products: {
    type: Array,
    required: true
  },
  categories: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['create_product'])
let initialData = {
  id: uuid(),
  title: '',
  price: 1,
  quantity: 1,
  description: '',
  category: null,
  photo: []
}
const categories = props.categories.map((el) => {
  return { ...el, ...{ value: el.id } }
})
onMounted(() => {
  if (props.edit_data) {
    initialData = {
      ...initialData,
      ...props.edit_data
    }
    const photosArr = props.edit_data.photo.map((item) => item)
    initialData.photo = photosArr
    setValues(initialData)
  }
})

yup.setLocale({
  mixed: {
    required: 'Обязательное поле'
  },
  string: {
    min: 'Минимальное кол-во символов ${min}',
    max: 'Максимальное кол-во символов ${max}'
  },
  number: {
    min: 'Минимальное кол-во символов ${min}',
    positive: 'Допустимы только положительные числа',
    moreThan: 'Допустимы числа больше нуля'
  }
})
const { handleSubmit, setValues } = useForm({
  initialValues: initialData,
  validationSchema: yup.object({
    title: yup
      .string()
      .required()
      .min(3)
      .matches(new RegExp('.*[a-zA-Zа-яА-Я].*'), {
        message: 'Поле не должно состоять только из цифр'
      })
      .test('is-exist', 'Товар с таким именем уже существует', (value) => {
        let flag = true
        for (const item of props.products) {
          if (item.title.trim().toLocaleLowerCase() === value.trim().toLocaleLowerCase()) {
            flag = false
            break
          }
        }
        return flag
      }),
    category: yup.string().required(),
    price: yup.number().required().moreThan(0).positive(),
    quantity: yup.number().required().moreThan(1).positive(),
    description: yup.string().max(255),
    photo: yup.array().of(yup.string().required())
  })
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
  emit('create_product', values)
})
</script>

<template>
  <div class="create-page">
    <div class="create-page__title">Создание товара</div>
    <form class="create-page__form" @submit.prevent="onSubmit">
      <div class="create-page__group">
        <div class="create-page__box create-page__box_w70">
          <div class="create-page__group">
            <div class="create-page__box create-page__box_w50">
              <div class="create-page__field">
                <TextField :name="'title'" :label="'Название'" />
              </div>
              <div class="create-page__field">
                <TextField :name="'price'" :type="'number'" :label="'Цена'" />
              </div>
              <div class="create-page__field">
                <TextField :name="'quantity'" :type="'number'" :label="'Количество'" />
              </div>
              <div class="create-page__field">
                <SelectField :name="'category'" :label="'Категория'" :options="categories" />
              </div>
            </div>
            <div class="create-page__box create-page__box_w50">
              <div class="create-page__field">
                <TextArea :name="'description'" :label="'Описание'" />
              </div>
            </div>
          </div>
        </div>
        <div class="create-page__box create-page__box_w30">
          <!-- repeater -->
          <FieldArray name="photo" v-slot="{ fields, push, remove }">
            <div v-for="(field, idx) in fields" :key="field.key" class="create-page__field">
              <div class="create-page__field">
                <TextField :name="`photo[${idx}]`" :label="`Ссылка на фото №${idx + 1}`" />
                <div v-if="field.value" class="create-page__photo">
                  <img :src="field.value" alt="" class="_fw" />
                </div>
              </div>
              <ButtonBase class="" @click.prevent="remove(idx)" :variant="'secondary'"
                >Удалить поле</ButtonBase
              >
            </div>
            <ButtonBase
              v-if="fields.length < 3"
              class="create-page__repeat"
              @click.prevent="push('')"
              :variant="'primary'"
              >Добавить фото</ButtonBase
            >
          </FieldArray>
        </div>
      </div>
      <div class="create-page__footer">
        <ButtonBase class="create-page__submit" type="submit" :variant="'secondary'"
          >Создать товар</ButtonBase
        >
      </div>
    </form>
  </div>
</template>
<style lang="scss" scoped>
.create-page {
  &__title {
    font-weight: 600;
    font-size: 30px;
    // padding-bottom: 10px;
  }
  &__group {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
  }
  &__field {
    padding: 10px 0;
    // width: 30%;
  }
  &__box {
    padding: 10px;
    &_w50 {
      width: 50%;
    }
    &_w60 {
      width: 60%;
    }
    &_w40 {
      width: 40%;
    }
    &_w70 {
      width: 70%;
    }
    &_w30 {
      width: 30%;
    }
  }
  &__repeat {
    margin-top: 15px;
  }
  &__photo {
    padding-top: 10px;
  }
  &__submit {
    max-width: 250px;
  }
}
</style>
