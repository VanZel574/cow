<template>
  <q-page>
    <!--    Table-->
    <Table
        title="Болюсы"
        :headers="headers"
        :row-data="boluses"
        :loading="tableLoading"
        @onModal="showModal"
        @onDelete="onDelete"
        @onSelect="onSelect"
    />

  </q-page>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import Table from "components/Table.vue";
import {useBoluses} from 'stores/boluses';
import {storeToRefs} from 'pinia';


const props = defineProps({
  activeFarm: Object
})

// init boluses store
const bolusesStore = useBoluses()
const {boluses} = storeToRefs(bolusesStore)


const headers = [
  {name: 'id', field:'id', label: 'id', align: 'left', headerStyle: 'font-weight: 600;'},
  {name: 'number', field:'number',label: 'Номер', align: 'left', headerStyle: 'font-weight: 600;'},
  {name: 'type', field:'type', label: 'Тип болюса', align: 'left', headerStyle: 'font-weight: 600;'},
  {name: 'cowName', field:'cowName', label: 'Имя животного', align: 'left', headerStyle: 'font-weight: 600;'},
  {name: 'cowID', field:'cowID', label: 'id животного', align: 'left', headerStyle: 'font-weight: 600;'},
  {name: 'status', field:'status', label: 'Статус', align: 'left', headerStyle: 'font-weight: 600;'},
  {name: 'chargeLevel', field:'chargeLevel', label: 'Уровень заряда', align: 'left', headerStyle: 'font-weight: 600;'},
]

const tableLoading = ref(false)

const loadData = async (farm) => {
  try {
    if (farm) {
      tableLoading.value = true
      await bolusesStore.loadData()
      tableLoading.value = false
    }
  } catch (e) {
    tableLoading.value = false
  }
}

// onMounted data
onMounted(() => {
  // check if data exists
  if (bolusesStore.boluses.length !== 0) return

  loadData(props.activeFarm)
})

// watch on farm change
watch(() => props.activeFarm, (newValue, oldValue) =>  {
  loadData(props.activeFarm)
})

const onSelect = (value) => {
  console.log(value)
}
// onDelete
const onDelete = async (value) => {
  try {
    await bolusesStore.deleteData(value)
  } catch (e) {
    console.log(e)
  }
}

// onModal
const showModal = (data) => {
}

</script>

<style scoped lang="scss">


</style>
