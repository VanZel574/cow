<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Новое животное</div>
    </q-card-section>

    <q-card-section>
      <q-form class="q-gutter-md" @submit="onNewAnimal">
        <q-input
            v-model="name"
            outlined
            label="Имя"
            :rules="[val => !!val || 'Поле не может быть пустым']"
        />
        <q-select
            outlined
            v-model="animalType"
            :options="animalTypeOptions"
            label="Порода животного"
            option-value="breed_id"
            option-label="breed"
            :rules="[val => !!val || 'Поле не может быть пустым']"
        />
<!--        <q-input-->
<!--            v-model="bolus"-->
<!--            outlined-->
<!--            autogrow-->
<!--            label="Id болюса"-->
<!--            :rules="[val => (val && val.length > 0) || 'Поле не может быть пустым']"-->
<!--        />-->

<!--        <q-select-->
<!--            outlined-->
<!--            v-model="bolus"-->
<!--            :options="bolusList"-->
<!--            label="Болюс"-->
<!--            option-value="id"-->
<!--            option-label="number"-->
<!--            :rules="[val => !!val || 'Поле не может быть пустым']"-->
<!--        />-->

        <q-input
            v-model="dateBorn"
            mask="date"
            :rules="['date', val => !!val || 'Поле не может быть пустым']"
            label="Дата рождения"
            outlined
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="dateBorn">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Закрыть" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
            v-model.number="lactation"
            type="number"
            label="День лактации"
            outlined
            :rules="[val => (!!val || val === 0) || 'Поле не может быть пустым']"
        />

        <div class="row text-primary">
          <q-btn flat label="Отменить" v-close-popup />
          <q-btn type="submit" flat label="Добавить животное" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import {ref, onBeforeMount, inject} from 'vue';


const props = defineProps({
  boluses: Array
})


const api = inject('$api')


const name = ref(null)
// const bolus = ref(null)
const dateBorn = ref(null)
const lactation = ref(null)
const animalType = ref(null)
const animalTypeOptions = ref([])

// const bolusList = computed(() => {
//   return props.boluses.filter(item => !item.cowID)
// })

// load animal type
onBeforeMount(async () => {
  try {
    animalTypeOptions.value = await api.getAnimalTypes()
  } catch (e) {
    console.log(e)
  }
})

const emit = defineEmits(['onNewAnimal'])

const onNewAnimal = () => {
  emit('onNewAnimal', {
    name: name.value,
    typeID: animalType.value.breed_id,
    dateOfBorn: dateBorn.value,
    lactationDay: lactation.value
  })
}

</script>

<style scoped>

</style>


