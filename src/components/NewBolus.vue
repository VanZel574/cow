<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Новый болюс</div>
    </q-card-section>

    <q-card-section>
      <q-form class="q-gutter-md" @submit="onNewBolus">
        <q-input
            v-model="bolusNum"
            outlined
            label="Номер болюса"
            :rules="[val => (val && val.length > 0) || 'Поле не может быть пустым']"
        />

        <q-select
            outlined
            v-model="bolusType"
            :options="bolusTypeOptions"
            label="Тип болюса"
            option-value="ID"
            option-label="Name"
            :rules="[val => !!val || 'Поле не может быть пустым']"
        />

<!--        <q-input-->
<!--            v-model.number="cowId"-->
<!--            type="number"-->
<!--            outlined-->
<!--            label="id животного"-->
<!--            :rules="[val => (!!val || val === 0) || 'Поле не может быть пустым']"-->
<!--        />-->

        <q-select
            outlined
            v-model="animal"
            :options="animalList"
            label="Животное"
            option-value="bolusID"
            option-label="name"
            :rules="[val => !!val || 'Поле не может быть пустым']"
        />

        <div class="row text-primary">
          <q-btn flat label="Отменить" v-close-popup />
          <q-btn type="submit" flat label="Добавить болюс" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import {ref, inject, onBeforeMount, computed} from 'vue';


const props = defineProps({
  animals: Array
})

const api = inject('$api')

const emit = defineEmits(['onNewBolus'])

const bolusNum = ref(null)
const bolusType = ref(null)
const animal = ref(null)

// for select types boluses
const bolusTypeOptions = ref([])

const animalList = computed(() => {
  return props.animals.filter(item => !item.bolusNum)
})

// load bolus type
onBeforeMount(async () => {
  try {
    bolusTypeOptions.value = await api.getBolusTypes()
  } catch (e) {
    console.log(e)
  }
})

const onNewBolus = () => {
  emit('onNewBolus', {
    number: bolusNum.value,
    typeID: bolusType.value.ID,
    cowID: animal.value.id,
  })
}
</script>

<style scoped>

</style>
