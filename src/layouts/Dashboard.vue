<template>
  <q-layout view="hHh lpR fFf">
    <!--    header-->
    <Header
      :farmList="farmList"
      :init-farm-model="activeFarm"
      :loading-logout="loadingLogout"
      @farmChange="farmChange"
      @newFarm="openDialog(NewFarm)"
      @newAnimal="openDialog(NewAnimal)"
      @newGroup="openDialog"
      @newBolus="openDialog(NewBolus)"
      @logout="logout"
    />

    <!--    modal-->
    <q-dialog v-model="newData">
      <keep-alive>
        <component
          :is="dialogComponent"
          @onNewFarm="onNewFarm"
          @onNewAnimal="onNewAnimal"
          @onNewBolus="onNewBolus"
          :animals="animals"
          :boluses="boluses"
        />
      </keep-alive>
    </q-dialog>

    <!--    content-->
    <q-page-container>
      <router-view :active-farm="activeFarm" />
    </q-page-container>

    <!--    footer-->
    <Footer  />

  </q-layout>
</template>

<script setup>
import {onBeforeMount, ref, shallowRef} from "vue";
import Header from 'components/layout/Header.vue';
import Footer from 'components/layout/Footer.vue';
import NewFarm from 'components/NewFarm.vue';
import NewAnimal from 'components/NewAnimal.vue';
import NewBolus from 'components/NewBolus.vue';
import {useFarm} from 'stores/farm';
import {useAuth} from "stores/auth";
import {useAnimals} from "stores/animals";
import {storeToRefs} from 'pinia';
import {useBoluses} from "stores/boluses";


// store
const farmStore = useFarm()
const {farmList, activeFarm} = storeToRefs(farmStore)

const authStore = useAuth()
const animalStore = useAnimals()
const {animals} = storeToRefs(animalStore)

const bolusStore = useBoluses()
const {boluses} = storeToRefs(bolusStore)

// Load farm list
onBeforeMount(async () => {
  try {
    await farmStore.loadData()
    //check local storage farm
    farmStore.checkFarm()
  } catch (e) {
    console.log(e)
  }
})

// farm change
const farmChange = async (farm) => {
  try {
    farmStore.setActiveFarm(farm)
    await animalStore.loadData(farm)
    await bolusStore.loadData(farm)
  }catch (e) {
    console.log(e)
  }
}

// dialog model
const newData = ref(false)
const dialogComponent = shallowRef(null)

const openDialog = (component) => {
  dialogComponent.value = component
  // show dialog
  newData.value = true
}

// add new farm
const onNewFarm = async (value) => {
  try {
    await farmStore.addData(value)
  } catch (e) {
    console.log(e)
  }
  // close dialog
  newData.value = false
}

// add new animal
const onNewAnimal = async (value) => {
  try {
    await animalStore.addData(value)
  } catch (e) {
    console.log(e)
  }
  // close dialog
  newData.value = false
}

// add new bolus
const onNewBolus = async (value) => {
  try {
    await bolusStore.addData(value)
  } catch (e) {
    console.log(e)
  }
  // close dialog
  newData.value = false
}

// logout
const loadingLogout = ref(false)
const logout = async () => {
  try {
    loadingLogout.value = true
    await authStore.logout()
    loadingLogout.value = false
  } catch (e) {
    loadingLogout.value = false
    console.log(e)
  }
}

</script>

<style scoped>

</style>

