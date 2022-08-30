<template>
  <q-page class="flex justify-center items-center q-pa-md">
<!--    <p class="text-negative text-center" v-if="showError" style="width: 100%">{{ errorText }}</p>-->
    <q-card style="width: 100%; max-width: 400px">
      <p class="text-negative text-center q-pa-md" v-if="showError">{{ errorText }}</p>
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-sm">
          <q-input
            v-model="name"
            filled
            label="Ваше имя"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Введите имя']"
          />
          <q-input
            v-model="email"
            filled
            label="Email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Введите email']"
            type="email"
          />
          <q-input
            v-model="password"
            filled
            label="Пароль"
            lazy-rules
            :rules="[
              val => !!val || 'Поле обязательно',
              val => (val.length >= 8 && val.length <= 128)  || 'Минимум 8 символов, максимум 128',
              val => !val.search(/^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\W)(?=.*[0-9]).*$/)  || 'Пароль должен содержать как минимум одну цифру, заглавную букву, специальные символы',
              val => !!val.search(/(?=.*\s)/)|| 'Пароль не должен содержать пробелы'
            ]"
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
          <q-input
            v-model="passwordRepeat"
            filled
            label="Повторите пароль"
            lazy-rules
            :rules="[val => !!val || 'Поле обязательно']"
            :type="isPwdRepeat ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwdRepeat ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwdRepeat = !isPwdRepeat"
              />
            </template>
          </q-input>
          <q-input
            v-model="registerKey"
            filled
            label="Ключ"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Введите ключ']"
          >
          </q-input>
          <q-select square outlined v-model="permissionModel" :options="permissionTypes" label="Выберите роль" />
          <q-btn label="Зарегистрироваться" type="submit" color="primary" :loading="loading" class="q-mt-xl" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { $api } from "boot/api";
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useAuth } from "stores/auth";


const router = useRouter()
const $q = useQuasar()
const authStore = useAuth()


const isPwd = ref(true)
const isPwdRepeat = ref(true)
const name = ref(null)
const email = ref(null)
const password = ref(null)
const passwordRepeat = ref(null)
const registerKey = ref(null)

const loading = ref(false)
const errorText = ref('Ошибка')
const showError = ref(false)

const permissionModel = ref(null)
const permissionTypes = ref([])


// registerUser
const onSubmit = async () => {
  try {
    if (password.value !== passwordRepeat.value) {
      errorText.value = 'Пароли не совпадают'
      showError.value = true
      return
    }
    loading.value = true
    const response = await authStore.register({
      login: name.value,
      password: password.value,
      key: registerKey.value,
      email: email.value,
      permission: permissionModel.value
    })
    loading.value = false

    switch (response.status) {
      case 200:
        showError.value = false
        $q.notify({
          message: 'Пользователь успешно зарегистрирован',
          color: 'positive'
        })
        router.push({path: '/'})
        break
      case 400:
        errorText.value = 'Не верный формат запроса'
        showError.value = true
        break
      case 500:
        errorText.value = 'Внутренняя ошибка сервера'
        showError.value = true
        break
      case 409:
        errorText.value = response.data.error
        showError.value = true
        break
      default:
        errorText.value = 'Ошибка'
        showError.value = true
    }
  } catch (e) {
    loading.value = false
  }
}

// get permission types
onBeforeMount(async () => {
  try {
    permissionTypes.value = await $api.getPermissionTypes()
  } catch (e) {
    console.log(e)
  }
})

</script>

<style scoped>

</style>
