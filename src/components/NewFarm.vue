<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Новая ферма</div>
    </q-card-section>

    <q-card-section>
      <q-form class="q-gutter-md" @submit="onNewFarm">
        <q-input
            v-model="name"
            outlined
            label="Имя"
            :rules="[val => !!val || 'Поле не может быть пустым']"
        />
        <q-input
            v-model="address"
            outlined
            autogrow
            label="Адрес"
            :rules="[val => !!val || 'Поле не может быть пустым']"
        />

        <div class="row text-primary">
          <q-btn flat label="Отменить" v-close-popup />
          <q-btn type="submit" flat label="Добавить ферму" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import {ref} from 'vue';

const name = ref(null)
const address = ref(null)

const emit = defineEmits(['onNewFarm'])

const onNewFarm = () => {
  emit('onNewFarm', {
    name: name.value,
    address: address.value
  })
}

</script>

<style scoped>

</style>
