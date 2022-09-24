<template>
  <q-form @submit="onSubmit" class="q-gutter-md" style="min-width: 400px">
    <q-input v-model="inn" outlined label="Введите inn организации" />

    <q-btn label="Добавить" type="submit" color="primary" :loading="loading" />
  </q-form>
</template>

<script setup>
import { ref } from 'vue';
import { useOrganisation } from "stores/organisations";


const emit = defineEmits(['dialogClose'])
const organisationStore = useOrganisation()

const inn = ref(null)
const loading = ref(false)

// add organisation
const onSubmit = () => {
  loading.value = true
  organisationStore.addData(inn.value)
  loading.value = false
  emit('dialogClose')
}
</script>

<style scoped>

</style>
