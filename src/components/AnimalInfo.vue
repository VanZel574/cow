<template>
  <div class="row q-gutter-md">
<!--    Общие данные-->
    <div class="col">
      <q-card>
        <q-card-section>
          <div class="text-h6">Общие сведения</div>
        </q-card-section>

        <q-card-section>
          <q-list style="display: flex; flex-wrap: wrap">
            <q-item v-for="(item, index) in summaryData" style="width: 50%">
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
                <q-item-label caption>{{item.value}}</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-card-section>
      </q-card>
    </div>

<!--    Здоровье-->
    <div class="col">
      <q-card>
        <q-card-section>
          <div class="text-h6">Здоровье</div>
        </q-card-section>

        <q-card-section>
          <q-list>
            <q-item v-for="(item, index) in healthData">
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
                <q-item-label caption>{{item.value}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </div>

<!--    График-->
  <div class="row q-my-md">
    <div class="col">
      <q-card>
        <q-card-section>
          <div class="text-h6">История</div>
        </q-card-section>
        <q-card-section>
          <v-chart class="chart" :option="historyData" v-if="historyData" />
          <div class="text-body2" v-else>
            <q-icon name="warning" color="warning" size="2em"></q-icon>
            Данных нет
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>


</template>

<script setup>
import {computed} from 'vue'


const props = defineProps({
  data: Object
})


// convert date
const buildDate = (item) => {
  const date = new Date(item)
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
}

//build summary data
const summaryData = computed(() => {
  if (!props.data) {
    return []
  }

  const {summary} = props.data
  return [
    {label: 'Имя', value: summary.name},
    {label: 'Тип', value: summary.type},
    {label: 'Номер болюса', value: summary.bolusNum},
    {label: 'Дата рождения', value: buildDate(summary.dateOfBorn)},
    {label: 'Возраст', value: summary.age},
    {label: 'Ферма', value: summary.farm},
    {label: 'День лактации', value: summary.lactationDay},
    {label: 'Нестельная?', value: summary.calf},
    {label: 'День осеменения', value: summary.inseminationDay},
  ]
})

//build health data
const healthData = computed(() => {
  if (!props.data) {
    return []
  }

  const {health} = props.data
  return [
    {label: 'Жажда?', value: health.drink},
    {label: 'Температура', value: health.temperature},
    {label: 'Стресс', value: health.stress},
    {label: 'Активность', value: health.activity},
  ]
})

// build history graph
const historyData = computed(() => {
  if (!props.data) {
    return null
  }

  const {history} = props.data
  if (!history) return null

  // build series name
  const seriesNameList = ['ph', 'temperature']
  let xAxisData = []
  let series = seriesNameList.map((item,i) => {
    return {
      name: item,
      data: [],
      type: 'line',
      yAxisIndex: i,
    }
  })

  // build chart data
  history.forEach(item => {
    // xAxisData.push(buildDate(item.dateTime))
    // let seriesItem = series.find((el) => {el.name = item.})
    for (let key in item) {
      if (key === 'dateTime') {
        xAxisData.push(buildDate(item.dateTime))
      } else {
        let seriesItem = series.find(el => el.name === key)
        seriesItem ? seriesItem.data.push(item[key]) : null
      }
    }
  })

  return {
    xAxis: {
      type: 'category',
      data: xAxisData
    },
    yAxis: [
      {
        type: 'value',
        name: seriesNameList[0],
        min: function (value) {
          return value.min - 1
        },
        max: function (value) {
          return value.max + 1
        },

      },
      {
        type: 'value',
        name: seriesNameList[1],
        min: function (value) {
          return value.min - 1
        },
        max: function (value) {
          return value.max + 1
        },
      }
    ],
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: seriesNameList
    },

    series
  }
})


</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>
