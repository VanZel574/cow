<template>
  <q-card v-if="activeFarm">
    <q-card-section>
      Статус фертильности
      <Info-data :data="infoData" />

    </q-card-section>
  </q-card>
</template>

<script setup>
import {$api} from "boot/api";
import {ref, onMounted, watch} from "vue";
import ComponentData from "../common/componentData";
import InfoData from 'components/InfoData.vue';

const props = defineProps({
  activeFarm: Object
})

// ref
const plotData = ref(null)
const infoData = ref(null)

const data = [
  {
    ref: plotData,
    endpoint: 'plot'
  },
  {
    ref: infoData,
    endpoint: 'info'
  }
]

// manage herd instance
const componentData = new ComponentData($api, data, 'reproduction')

const loadData = (activeFarm) => {
  // check if farm exists
  if (activeFarm) {
    componentData.getData(activeFarm)
  }
}

// onMounted data
onMounted(() => {
  loadData(props.activeFarm)
})

// watch on farm change
watch(() => props.activeFarm, (newValue, oldValue) =>  {
  loadData(newValue)
})

</script>

<style scoped>

</style>
