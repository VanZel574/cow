<template>
  <q-form @submit="onSubmit" class="q-gutter-md" style="min-width: 400px">
    <q-input v-model="value" outlined label="Введите inn организации" />

    <q-btn label="Добавить" type="submit" color="primary" />
  </q-form>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(null)
const onSubmit = async () => {
  try {

  } catch (e) {
    console.log(e)
  }
}
</script>

<style scoped>

</style>
