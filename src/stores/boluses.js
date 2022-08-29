import { defineStore } from 'pinia'
import {useFarm} from "./farm";
import {useAnimals} from "./animals";
import Cookies from "js-cookie";


export const useBoluses = defineStore('boluses', {
  state: () => {
    return {
      boluses: [],
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

    /*-------------------
    * load boluses list
    *------------------*/
    async loadData () {
      try {
        // farm store
        const farm = useFarm()
        const {activeFarm} = farm

        this.boluses = await this.api.getBolusList(activeFarm)

        // hide cowID ==0
        if (this.boluses.length !== 0) {
          this.boluses = this.boluses.map(item => {
            item.cowID = item.cowID ? item.cowID : ''
            return item
          })
        }
      } catch (e) {
        throw new Error(e)
      }
    },

    /*-----------------
    * add new bolus
    *-----------------*/
    async addData (value) {
      try {
        // add
        await this.api.addNewBolus(value)

        // load bolus list
        await this.loadData()

        // load animal list
        const animalStore = useAnimals()
        await animalStore.loadData()
      } catch (e) {
        throw new Error(e)
      }
    },

    /*------------------
    * delete bolus
    *--------------------*/
    async deleteData (value) {
      try {
        // get id
        const payload = value.map(item => item.id)
        // delete
        await this.api.deleteBolus(payload)

        // load bolus list
        await this.loadData()
      } catch (e) {
        throw new Error(e)
      }
    }
  }
})
