import { defineStore } from 'pinia'
import {useFarm} from './farm'
import Cookies from "js-cookie";


export const useAnimals = defineStore('animals', {
  state: () => {
    return {
      animals: [],
    }
  },

  actions: {
    /*-----------------
    * user have no auth
    *----------------*/
    noAuth () {
      // set to local storage
      localStorage.setItem('auth', JSON.stringify(this.$state))
      // clear cookie
      Cookies.remove('cows_health')
      this.router.push({path: '/auth/login'})
    },

    /*--------------------------
    * load animal list
    *-------------------------*/
    async loadData () {
      try {
        const farm = useFarm()
        const {activeFarm} = farm

        this.animals = await this.api.getAnimalList(activeFarm)

        // hide bolusID ==0
        if (this.animals.length !== 0) {
          this.animals = this.animals.map(item => {
            item.bolusID = item.bolusID ? item.bolusID : ''
            return item
          })
        }
      } catch (e) {
        throw new Error(e)
      }
    },

    /*------------------------
    * add new animal
    *-----------------------*/
    async addData (value) {
      try {
        // farm store
        const farm = useFarm()
        const {activeFarm} = farm

        // add farm id to payload
        const payload = {...value, farmID: activeFarm.id}
        await this.api.addNewAnimal(payload)

        // load cow list
        await this.loadData(activeFarm)
      } catch (e) {
        throw new Error(e)
      }
    },

    // /*----------------------
    // * get animal info
    // *---------------------*/
    // async getInfo ({id}) {
    //   try {
    //     this.animalInfo = await this.api.getAnimalInfo(id)
    //   }catch (e) {
    //     throw new Error(e)
    //   }
    // },

    /*-------------------
    * delete animal
    *------------------*/
    async deleteData (value) {
      try {
        // farm store
        const farm = useFarm()
        const {activeFarm} = farm
        // get id
        const payload = value.map(item => item.id)

        // delete
        await this.api.deleteAnimal(payload)

        // load cow list
        await this.loadData(activeFarm)
      } catch (e) {
        throw new Error(e)
      }
    }
  }
})
