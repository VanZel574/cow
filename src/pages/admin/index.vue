<template>
  <q-page>
    <div class="row q-pa-md bg-primary">
      <q-tabs v-model="tab" dense narrow-indicator class="text-white">
        <q-tab name="organisations" label="Организации" />
        <q-tab name="users" label="Пользователи" />
      </q-tabs>

      <q-space />
      <q-btn to="/" label="вернуться на портал" flat text-color="indigo-1" />
    </div>


    <div class="row q-pa-md">
      <div class="col-12">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="organisations">
            <organisations />
          </q-tab-panel>

          <q-tab-panel name="users">
            <users />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import Organisations from "components/admin/Organisations.vue";
import Users from "components/admin/Users.vue"


const tab = ref('organisations')

</script>

<style scoped>

</style>
