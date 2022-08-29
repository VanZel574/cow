<template>
  <q-page class="flex justify-center items-center q-pa-md">
      <p class="text-negative text-center" v-if="showError">{{ errorText }}</p>
      <q-card style="width: 100%; max-width: 400px">
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              v-model="name"
              filled
              label="Ваше имя"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Введите имя']"
            />
            <q-input
              v-model="password"
              filled
              label="Пароль"
              lazy-rules
              :rules="[val => !!val || 'Поле обязательно']"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <div>
              <q-btn label="Войти" type="submit" color="primary" :loading="loading" />
              <q-btn label="Регистрация" color="primary" flat class="q-ml-sm" to="/auth/register" />
            </div>

          </q-form>
        </q-card-section>
      </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { $api } from "boot/api";


const isPwd = ref(true)
const name = ref(null)
const password = ref(null)

const loading = ref(false)
const showError = ref(false)
const errorText = ref('Ошибка')

// login
const onSubmit = async () => {
  try {
    loading.value = true
    await $api.login({
      login: name.value,
      password: password.value
    })
    loading.value = false
  } catch (e) {
    loading.value = false
    showError.value = true
    switch (e.status) {
      case 400:
        errorText.value = 'неверный формат запроса'
        break
      case 401:
        errorText.value = 'неверная пара логин/пароль'
        break
      case 500:
        errorText.value = 'внутренняя ошибка сервера'
        break
      default:
        errorText.value = 'ошибка'
    }
  }
}

</script>

<style scoped>

</style>
