<template>
  <q-page>
<!--    Table-->
  <Table
      title="Животные"
      :headers="headers"
      :row-data="animals"
      :loading="tableLoading"
      @onSelect="onSelect"
      @onModal="showModal"
      @onDelete="onDelete"
  />

<!--    Modal-->
    <q-dialog
        v-model="dialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
    >
      <q-card class="bg-primary">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Свернуть</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Развернуть</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Закрыть</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6 text-white">Данные животного</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <animal-info :data="animalInfo" />
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { $api } from "boot/api";
import {ref, onMounted, watch} from "vue";
import Table from "components/Table.vue";
import AnimalInfo from "components/AnimalInfo.vue"
import {useAnimals} from 'stores/animals';
import {storeToRefs} from 'pinia';


const props = defineProps({
  activeFarm: Object
})



// init animals store
const animalsStore = useAnimals()
const {animals} = storeToRefs(animalsStore)

const headers = [
  {name:'id', field:'id', label: 'id', align: 'left', headerStyle: 'font-weight: 600;'},
  {name:'name', field:'name',label: 'Имя', align: 'left', headerStyle: 'font-weight: 600;'},
  {name:'dateOfBorn', field:'dateOfBorn',label: 'Дата рождения', align: 'left', headerStyle: 'font-weight: 600;'},
  {name:'lactationDay', field:'lactationDay',label: 'День лактации', align: 'left', headerStyle: 'font-weight: 600;'},
  {name:'type', field:'type',label: 'Тип', align: 'left', headerStyle: 'font-weight: 600;'},
  {name:'bolusID', field:'bolusID',label: 'Id болюса', align: 'left', headerStyle: 'font-weight: 600;'},
  {name:'bolusNum', field:'bolusNum',label: 'Номер болюса', align: 'left', headerStyle: 'font-weight: 600;'},
  {name:'calf', field:'calf',label: 'Нестельная', align: 'left', headerStyle: 'font-weight: 600;'},
  {name: 'actions', label: 'Действия', align: 'center', headerStyle: 'font-weight: 600;', field: 'actions'},
]
const dialog = ref(false)
const maximizedToggle = ref(true)
const tableLoading = ref(false)

const loadData = async (farm) => {
  try {
    if (farm) {
      tableLoading.value = true
      await animalsStore.loadData(farm)
      tableLoading.value = false
    }
  } catch (e) {
    tableLoading.value = false
  }
}

// onMounted data
onMounted(() => {
  if (animalsStore.animals.length !== 0) return

  loadData(props.activeFarm)
})

// watch on farm change
watch(() => props.activeFarm, (newValue, oldValue) =>  {
  loadData(props.activeFarm)
})

// onSelect
const onSelect = (value) => {
  console.log(value)
}

// onDelete
const onDelete = async (value) => {
  try {
    await animalsStore.deleteData(value)
  } catch (e) {
    console.log(e)
  }
}

// onModal-get animal info
const animalInfo = ref(null)
const showModal = async (data) => {
  try {
    animalInfo.value = await $api.getAnimalInfo(data)

    dialog.value = true
  } catch (e) {
    console.log(e)
  }

}

</script>

<style scoped lang="scss">

</style>
