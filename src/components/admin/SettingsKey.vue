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

    <q-btn label="Сохранить" type="submit" color="primary" :loading="loading"/>

  </q-form>
</template>

<script setup>
import { ref } from "vue";
// import { $api } from "boot/api";
// import { useQuasar } from 'quasar';
import { useOrganisation } from "stores/organisations";


const props = defineProps({
  organisation: {
    type: Object,
    default: () => {}
  },
})
const emit = defineEmits(['dialogClose'])
const organisationStore = useOrganisation()

const inn = ref(null)
const farms = ref(1)
const users = ref(1)

const loading = ref(false)

// const $q = useQuasar()

// register key
const onSubmit = () => {
  loading.value = true
  organisationStore.editKey({
    inn: props.organisation.inn,
    farms: farms.value,
    users: users.value
  })
  // const response = await $api.registerKey({
  //   inn: props.organisation.inn,
  //   farms: farms.value,
  //   users: users.value
  // })
  loading.value = false
  emit('dialogClose')
  // switch (response.status) {
  //   case 200:
  //     showError.value = false
  //     $q.notify({
  //       message: 'Ключ успешно зарегистрирован',
  //       color: 'positive'
  //     })
  //     break
  //   case 400:
  //     showError.value = true
  //     errorText.value = 'неверный формат запроса'
  //     break
  //   case 409:
  //     errorText.value = 'id уже существует в системе'
  //     showError.value = true
  //     break
  //   case 500:
  //     showError.value = true
  //     errorText.value = 'внутренняя ошибка сервера'
  //     break
  //   default:
  //     showError.value = true
  //     errorText.value = 'ошибка'
  // }
}

</script>

<style scoped>

</style>


