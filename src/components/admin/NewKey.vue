<template>
  <q-form @submit="onSubmit" class="q-gutter-md" style="min-width: 400px">
    <q-input
      v-model.number="farms"
      type="number"
      filled
      label="Количество ферм"
      lazy-rules
      :rules="[
              val => !!val || 'Поле не может быть пустым',
              val => val >= 0 || 'Количество ферм должно быть больше 0'
            ]"
    />

    <q-input
      v-model.number="users"
      type="number"
      filled
      label="Количество пользователей"
      lazy-rules
      :rules="[
              val => !!val || 'Поле не может быть пустым',
              val => val >= 0 || 'Количество ферм должно быть больше 0'
            ]"
    />

    <q-btn label="Зарегистрировать ключ" type="submit" color="primary" :loading="loading"/>

  </q-form>
</template>

<script setup>
import { ref } from "vue";
import { $api } from "boot/api";
import { useQuasar } from 'quasar';


const props = defineProps({
  organisation: {
    type: Object,
    default: () => {}
  }
})

const inn = ref(null)
const farms = ref(1)
const users = ref(1)

const loading = ref(false)
const showError = ref(false)
const errorText = ref('Ошибка')

const $q = useQuasar()

// register key
const onSubmit = async () => {
  try {
    loading.value = true
    const response = await $api.registerKey({
      inn: props.organisation.inn,
      farms: farms.value,
      users: users.value
    })
    loading.value = false

    switch (response.status) {
      case 200:
        showError.value = false
        $q.notify({
          message: 'Ключ успешно зарегистрирован',
          color: 'positive'
        })
        break
      case 400:
        showError.value = true
        errorText.value = 'неверный формат запроса'
        break
      case 409:
        errorText.value = 'id уже существует в системе'
        showError.value = true
        break
      case 500:
        showError.value = true
        errorText.value = 'внутренняя ошибка сервера'
        break
      default:
        showError.value = true
        errorText.value = 'ошибка'
    }
  } catch (e) {
    loading.value = false
    console.log(e)
  }
}

</script>

<style scoped>

</style>

