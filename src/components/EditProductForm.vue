<script setup>
import { onMounted, ref } from 'vue'
import { useForm, FieldArray } from 'vee-validate'
import * as yup from 'yup'
import { v4 as uuid } from 'uuid'
import TextField from '@/components/ui/TextField.vue'
import TextArea from '@/components/ui/TextArea.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import SelectField from '@/components/ui/SelectField.vue'
import DialogModal from '@/components/ui/DialogModal.vue'

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
const dialogIsVisible = ref(false)
const createMode = ref(true)
const categories = props.categories.map((el) => {
  return { ...el, ...{ value: el.id } }
})
onMounted(() => {
  if (props.edit_data) {
    createMode.value = false
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
        if (createMode.value) {
          for (const item of props.products) {
            if (item.title.trim().toLocaleLowerCase() === value.trim().toLocaleLowerCase()) {
              flag = false
              break
            }
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

const onSubmit = handleSubmit((values, actions) => {
  emit('create_product', values)
  dialogIsVisible.value = true
  console.log(props.edit_data)
  if (!props.edit_data) {
    actions.resetForm()
    actions.setFieldValue('id', uuid())
  }
})
</script>

<template>
  <div class="create-page">
    <div class="create-page__title" v-if="createMode">Создание товара</div>
    <div class="create-page__title" v-else>Обновление товара</div>
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
        <ButtonBase
          v-if="createMode"
          class="create-page__submit"
          type="submit"
          :variant="'secondary'"
          >Создать товар</ButtonBase
        >
        <ButtonBase v-else class="create-page__submit" type="submit" :variant="'secondary'"
          >Обновить товар</ButtonBase
        >
      </div>
    </form>
    <DialogModal v-model:show="dialogIsVisible">
      <div class="dialog-message">
        <div class="dialog-message__item" v-if="createMode">
          <div class="dialog-message__title">Товар создан</div>
          <div class="dialog-message__box">
            <RouterLink to="/">
              <ButtonBase :variant="'secondary'" :tag_name="'span'"
                >Вернуться к списку товаров</ButtonBase
              >
            </RouterLink>
          </div>
          <div class="dialog-message__box">
            <ButtonBase :variant="'primary'" @click="dialogIsVisible = false"
              >Создать ещё один товар</ButtonBase
            >
          </div>
        </div>
        <div class="dialog-message__item" v-else>
          <div class="dialog-message__title">Товар обновлен</div>
          <div class="dialog-message__box">
            <RouterLink to="/">
              <ButtonBase :variant="'secondary'" :tag_name="'span'"
                >Вернуться к списку товаров</ButtonBase
              >
            </RouterLink>
          </div>
          <div class="dialog-message__box">
            <ButtonBase :variant="'primary'" @click="dialogIsVisible = false"
              >Вернуться к редактированию текущего товара</ButtonBase
            >
          </div>
        </div>
      </div>
    </DialogModal>
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
    @media (max-width: 850px) {
      &_w70 {
        width: 100%;
      }
      &_w30 {
        width: 100%;
        max-width: 400px;
      }
    }
    @media (max-width: 600px) {
      &_w50 {
        width: 100%;
      }
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
  &__footer {
    padding-top: 40px;
    text-align: center;
  }
}
.dialog-message {
  &__title {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    padding-bottom: 30px;
  }
  &__group {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -5px;
  }
  &__box {
    // width: 50%;
    padding: 10px 0;
  }
}
</style>
