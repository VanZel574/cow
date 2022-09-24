<template>
  <q-table
    :columns="columns"
    :rows="organisationStore.organisationList"
    row-key="id"
    selection="multiple"
    v-model:selected="selected"
  >
    <template v-slot:top>
      <q-btn color="primary" label="Добавить организацию" @click="addData"></q-btn>
    </template>

    <template v-slot:bottom>
      <q-btn color="negative" label="Удалить" @click="deleteData"></q-btn>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <div class="row">
          <q-btn
            round
            color="positive"
            icon="add_circle_outline"
            flat
            :disable="props.row.key !== null"
            @click="generateKey(props)"
          >
            <q-tooltip>Сгенерировать ключ</q-tooltip>
          </q-btn>

          <q-btn
            round
            color="info"
            icon="mode"
            flat
            :disable="props.row.key === null"
            @click="settingsKey(props)"
          >
            <q-tooltip>Редактировать ключ</q-tooltip>
          </q-btn>
        </div>
      </q-td>
    </template>
  </q-table>

  <modal :open-dialog="dialog" @dialog-close="dialog = false">
    <component
      :is="modalComponents[modalComponent]"
      :organisation="organisation"
      @dialog-close="dialog = false">
    </component>
  </modal>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useOrganisation } from "stores/organisations";
import Modal from "components/Modal.vue";
import NewOrganisation from "components/admin/NewOrganisation.vue";
import NewKey from "components/admin/NewKey.vue";
import SettingsKey from "components/admin/SettingsKey.vue"


const organisationStore = useOrganisation()

// table
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
// const rows = ref(organisationStore.organisationList)
const selected = ref([])

// modal
const dialog = ref(false)
const modalComponents = {NewOrganisation, NewKey, SettingsKey}
const modalComponent = ref('NewOrganisation')

const organisation = ref({})

// load organisation list
onMounted(() => {
  organisationStore.loadData()
})

const addData = () => {
  modalComponent.value = 'NewOrganisation'
  dialog.value = true
}

const deleteData = () => {
  if (selected.value.length === 0) return

  organisationStore.deleteData(selected.value)
  selected.value = []
}

const generateKey = (props) => {
  modalComponent.value = 'NewKey'
  organisation.value = props.row
  dialog.value = true
}
const settingsKey = (props) => {
  modalComponent.value = 'SettingsKey'
  organisation.value = props.row
  dialog.value = true
}

</script>

<style scoped>

</style>
