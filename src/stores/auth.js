import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { useFarm } from './farm';
import { useAnimals } from "./animals";
import { useBoluses } from "./boluses";


export const useAuth = defineStore('auth', {
  state: () => {
    return {
      isAuth: false,
      token: null,
      userId: null,
      role: ''
    }
  },

  actions: {
    authAction (response) {
      if (response.status === 200) {
        this.checkAuth()
        // set to local storage
        localStorage.setItem('auth', JSON.stringify(this.$state))
        // this.router.push({path: '/'})
      }
    },
    /*-----------------------
    * login user
    *----------------------*/
    async login (payload) {
      try {
        const response = await this.api.login(payload)

        this.authAction(response)

        return response
      } catch (e) {
        throw e
      }
    },

    /*--------------------
    * register user
    *-------------------*/
    async register (payload) {
      try {
        const response = await this.api.registerUser(payload)

        this.authAction(response)

        return response
      } catch (e) {
        throw e
      }
    },

    /*----------------------
    * logout user
    *----------------------*/
    async logout () {
      try {
        await this.api.logout()

        // go to login page
        this.router.push({path: '/auth/login'})

        // reset state
        this.$reset()

        const farmStore = useFarm()
        const animalStore = useAnimals()
        const bolusesStore = useBoluses()
        farmStore.$reset()
        animalStore.$reset()
        bolusesStore.$reset()

        // set to local storage
        localStorage.setItem('auth', JSON.stringify(this.$state))
        // clear cookie
        Cookies.remove('cows_health')
      } catch (e) {
        throw e
      }
    },

    /*-------------------------
    * check user auth
    *------------------------*/
    checkAuth () {
      // const storageAuth = localStorage.getItem('auth')
      // if (storageAuth) {
      //   const {isAuth} = JSON.parse(storageAuth)
      //   this.isAuth = isAuth
      // }

      // get token
      const token = Cookies.get('cows_health')
      this.token = token
      this.isAuth = Boolean(token)
      this.role = 'admin'
    },

  }
})
