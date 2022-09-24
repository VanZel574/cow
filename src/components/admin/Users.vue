<template>
  <q-table
    :columns="columns"
    :rows="rows"
    row-key="id"
    selection="multiple"
    v-model:selected="selected"
  >
    <template v-slot:bottom>
      <q-btn color="negative" label="Удалить" @click="deleteData"></q-btn>
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
import { $api } from "boot/api";


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

const loadData = async () => {
  try {
    rows.value = await $api.organisationUsers(null, 'GET')
  } catch (e) {
    throw e
  }
}

onMounted( () => {
  loadData().catch(e => console.log(e))
})

const deleteData = async () => {
  try {
    // delete
    await $api.organisationUsers(selected.value, 'DELETE')

    // load
    await loadData()
  } catch (e) {
    console.log(e)
  }
}



</script>

<style scoped>

</style>
