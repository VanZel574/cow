import { defineStore } from 'pinia';


export const useOrganisation = defineStore('organisation', {
  state: () => {
    return {
      organisationList: [],
      // activeFarm: JSON.parse(localStorage.getItem('farm'))
      activeOrganisation: null
    }
  },
  actions: {
    /*-----------------
    * load organisation list
    *-----------------*/
    async loadData () {
      try {
        this.organisationList = await this.api.getOrganisationList()
      } catch (e) {
        throw new Error(e)
      }
    },

    /*-----------------
    * set organisation to store
    *-----------------*/
    setActiveOrganisation () {
    },

    /*---------------
    * add new organisation
    *---------------*/
    async addData (payload) {
      try {
        this.organisationList.push({
          id: this.organisationList.length,
          inn: payload,
          users: null,
          usersTotal: null,
          farms: null,
          farmsTotal: null,
          key: null
        })
      } catch (e) {
        throw new Error(e)
      }
    },

    /*---------------------
    * delete organisations
    *--------------------*/
    async deleteData (data) {
      try {
        this.organisationList = this.organisationList.filter(item => {
          // data.find(el => el.id !== item.id)
          const index = data.findIndex(el => el.id === item.id)
          return index === -1
        })
      } catch (e) {
        throw new Error(e)
      }
    },

    /*--------------
    * generate key
    *---------------*/
    async generateKey (payload) {
      try {
        this.organisationList.forEach(item => {
          if (item.inn === payload.inn) {
            item.key = 'some key'
            item.usersTotal = payload.users
            item.farmsTotal = payload.farms
          }
        })
      } catch (e) {
        throw new Error(e)
      }
    },

    /*--------------
    * generate key
    *---------------*/
    async editKey (payload) {
      try {
        this.organisationList.forEach(item => {
          if (item.inn === payload.inn) {
            item.usersTotal = payload.users
            item.farmsTotal = payload.farms
          }
        })
      } catch (e) {
        throw new Error(e)
      }
    },
  }
})
