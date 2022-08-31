<template>
  <q-page class="flex justify-center items-center q-pa-md">
    <q-card style="width: 100%; max-width: 400px">
      <p class="text-negative text-center q-pa-md" v-if="showError">{{ errorText }}</p>
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="confirmKey"
            filled
            label="Введите код из письма"
            lazy-rules
            :rules="[ val => !!val || 'Введите код']"
          />

          <div class="q-mt-lg">
            <q-btn label="Подтвердить регистрацию" type="submit" color="primary" :loading="loading" />
            <q-btn label="Назад" color="primary" flat class="q-ml-sm" to="/" />
          </div>

        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { $api } from "boot/api";
import { useQuasar } from 'quasar';


const $q = useQuasar()

const showError = ref(false)
const errorText = ref('Ошибка')
const loading = ref(false)
const confirmKey = ref(null)


const onSubmit = async () => {
  try {
    loading.value = true
    const response = await $api.confirmationUser({
      key: confirmKey.value,
    })
    loading.value = false

    switch (response.status) {
      case 200:
        showError.value = false
        $q.notify({
          message: 'Регистрация подтверждена',
          color: 'positive'
        })
        break
      case 400:
        showError.value = true
        errorText.value = 'неверный формат запроса'
        break
      case 401:
        showError.value = true
        errorText.value = 'пользователь не авторизован'
        break
      case 409:
        errorText.value = 'ключ указан неверно'
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
