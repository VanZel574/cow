<template>
  <q-table
    :columns="columns"
    :rows="rows"
    row-key="name"
    selection="multiple"
    v-model:selected="selected"
  >
    <template v-slot:bottom>
      <q-btn color="negative" label="Удалить"></q-btn>
    </template>

<!--    <template v-slot:body-cell-actions="props">-->
<!--      <q-td :props="props">-->
<!--        <q-btn round color="info" icon="info" flat>-->
<!--          <q-tooltip>Информация о ключе</q-tooltip>-->
<!--        </q-btn>-->
<!--      </q-td>-->
<!--    </template>-->
  </q-table>
</template>

<script setup>
import { onMounted, ref } from "vue";

const columns = [
  {
    name: 'id',
    label: 'id',
    field: 'id',
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
    name: 'inn',
    label: 'Организация',
    field: 'inn',
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
  // {
  //   name: 'actions',
  //   label: 'Действия',
  //   field: 'actions',
  //   align: 'left',
  //   headerStyle: 'font-weight: 600;'
  // }
]
const rows = ref([])

const selected = ref([])

onMounted(async () => {
  try {
    rows.value = [{
      id: 0,
      inn: '123',
      user: 'user1',
      key: 'ololo'
    }]
  } catch (e) {
    console.log(e)
  }
})


</script>

<style scoped>

</style>
