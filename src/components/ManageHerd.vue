<template>
  <q-card v-if="activeFarm">
    <q-card-section>
      Перечень действий управления стадом
<!--      General data Info-->
      <Info-data :data="generalData" col-view :show-name="false" />
<!--      Plot data-->

<!--      Additional-info-->
      <Info-data :data="infoData" />

    </q-card-section>
  </q-card>
</template>

<script setup>
import {$api} from "boot/api";
import {onMounted, ref, watch} from "vue";
import ComponentData from "../common/componentData";
import InfoData from 'components/InfoData.vue';


const props = defineProps({
  activeFarm: Object,
})

// ref
const generalData = ref(null)
const plotData = ref(null)
const infoData = ref(null)

const data = [
  {
    ref: generalData,
    endpoint: 'general'
  },
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
const componentData = new ComponentData($api, data, 'manage')

const loadData = (activeFarm) => {
  // check if farm exists
  if (activeFarm) {
    console.log('load new farm')
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
