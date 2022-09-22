<template>
  <q-table
    :columns="columns"
    :rows="rows"
    row-key="name"
    selection="multiple"
    v-model:selected="selected"
  >
    <template v-slot:top>
      <q-btn color="primary" label="Добавить организацию" @click="addOrganisation"></q-btn>
    </template>

    <template v-slot:bottom>
      <q-btn color="negative" label="Удалить"></q-btn>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <div class="row">
          <q-btn
            round
            color="positive"
            icon="add_circle_outline"
            flat
            :disable="props.row.key"
            @click="generateKey(props)"
          >
            <q-tooltip>Сгенерировать ключ</q-tooltip>
          </q-btn>

          <q-btn
            round
            color="info"
            icon="mode"
            flat
            :disable="!props.row.key"
            @click="settingsKey(props)"
          >
            <q-tooltip>Редактировать ключ</q-tooltip>
          </q-btn>
        </div>
      </q-td>
    </template>
  </q-table>

  <modal :open-dialog="dialog" @dialog-close="dialog = false">
    <component :is="modalComponents[modalComponent]" :organisation="organisation"></component>
  </modal>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Modal from "components/Modal.vue";
import NewOrganisation from "components/admin/NewOrganisation.vue";
import NewKey from "components/admin/NewKey.vue"


const columns = [
  {
    name: 'id',
    label: 'id',
    field: 'id',
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
    name: 'users',
    label: 'Пользователи',
    field: 'users',
    align: 'left',
    headerStyle: 'font-weight: 600;'
  },
  {
    name: 'usersTotal',
    label: '№ пользователей',
    field: 'usersTotal',
    align: 'left',
    headerStyle: 'font-weight: 600;'
  },
  {
    name: 'farms',
    label: 'Фермы',
    field: 'farms',
    align: 'left',
    headerStyle: 'font-weight: 600;'
  },
  {
    name: 'farmsTotal',
    label: '№ ферм',
    field: 'farmsTotal',
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
const selected = ref([])

// modal
const dialog = ref(false)
const modalComponents = {NewOrganisation, NewKey}
const modalComponent = ref('NewOrganisation')

const organisation = ref({})

onMounted(() => {
  rows.value.push({
    id: 0,
    inn: '123',
    users: null,
    usersTotal: null,
    farms: null,
    farmsTotal: null,
    key: null,
  })
})

const addOrganisation = () => {
  modalComponent.value = 'NewOrganisation'
  dialog.value = true
}

const generateKey = (props) => {
  modalComponent.value = 'NewKey'
  dialog.value = true
  organisation.value = props.row
}
const settingsKey = (props) => {
}
</script>

<style scoped>

</style>
