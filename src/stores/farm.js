import { defineStore } from 'pinia';
import Cookies from "js-cookie";


export const useFarm = defineStore('farm', {
  state: () => {
    return {
      farmList: [],
      // activeFarm: JSON.parse(localStorage.getItem('farm'))
      activeFarm: null
    }
  },
  actions: {
    /*-----------------
    * user has no auth
    *----------------*/
    noAuth () {
      // set to local storage
      localStorage.setItem('auth', JSON.stringify(this.$state))
      // clear cookie
      Cookies.remove('cows_health')
      this.router.push({path: '/auth/login'})
    },

    /*-----------------
    * load farms list
    *-----------------*/
    async loadData () {
      try {
        this.farmList = await this.api.getFarmList()
      } catch (e) {
        throw new Error(e)
      }
    },

    /*-----------------
    * set farm to store
    *-----------------*/
    setActiveFarm (farm) {
      this.activeFarm = farm
      localStorage.setItem('farm', JSON.stringify(farm));
    },

    /*------------------------------------
    * check localstorage farm in farm list
    *-----------------------------------*/
    checkFarm () {
      const activeFarm = JSON.parse(localStorage.getItem('farm'))
      if (!activeFarm) return

      const {id} = activeFarm
      const farmExist = this.farmList.find(item => item.id === id)
      if (farmExist) {
        this.activeFarm = activeFarm
      } else {
        this.activeFarm = null
        localStorage.removeItem('farm')
      }
    },

    /*---------------
    * add new farm
    *---------------*/
    async addData (payload) {
      try {
        // add
        await this.api.addNewFarm(payload)

        // get farm list
        await this.loadData()
      } catch (e) {
        console.log(e)
        throw new Error(e)
      }
    },

    async deleteData () {}
  }
})
