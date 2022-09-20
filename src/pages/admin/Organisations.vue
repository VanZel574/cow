<template>
  <q-page>
    <div class="row q-pa-md">
      <div class="col">
        <q-table
          :columns="columns"
          :rows="rows"
          row-key="name"
        >
          <template v-slot:top>
            <q-btn color="primary" label="Добавить ключ"></q-btn>
          </template>

          <template v-slot:bottom>
            <q-btn color="negative" label="Удалить"></q-btn>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn round color="info" icon="info" flat>
                <q-tooltip>Информация о ключе</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';


const columns = [
  {
    name: 'inn',
    label: 'Организация',
    field: 'inn',
    align: 'left',
    headerStyle: 'font-weight: 600;'
  },
  {
    name: 'user',
    label: 'Пользователь',
    field: 'user',
    align: 'left',
    headerStyle: 'font-weight: 600;'
  },
  {
    name: 'key',
    label: 'Ключ',
    field: 'key',
    align: 'left',
    headerStyle: 'font-weight: 600;'
  },
  {
    name: 'actions',
    label: 'Действия',
    field: 'actions',
    align: 'left',
    headerStyle: 'font-weight: 600;'
  }
]
const rows = ref([])

onMounted(async () => {
  try {
    rows.value = [{
      inn: '123',
      user: 'user1',
      key: 'sdfsdf'
    }]
  } catch (e) {
    console.log(e)
  }
})


</script>

<style scoped>

</style>
