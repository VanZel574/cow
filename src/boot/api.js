import axios from "axios";
import qs from 'qs';
import serverDataHandler from "../common/serverDataHandler";


// axios instance
const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

/*----------------------------------------------------
* API functions
*----------------------------------------------------*/
class Api {
  constructor() {
    this.csrf = ''
  }

  /*---------------------------------------------
  * Fetch data from server
  *---------------------------------------------*/
  async fetchData ({endpoint, data, method, params}) {
    try {
      // config axios
      const response = await axiosInstance(`${endpoint}`, {
        method: method ? method : 'GET',
        data: data,
        params: params,
        paramsSerializer: params => {
          return qs.stringify(params)
        }
      })

      // response
      const responseData = await response.data

      return {
        data: responseData,
        status: response.status,
        message: response.statusText,
        error: false
      }
    } catch (e) {
      // throw e
      return {
        data: e.response.data,
        status: e.response.status,
        message: e.message,
        error: true
      }
    }
  }

  /*--------------------------------------------
  * Auth
  *-------------------------------------------*/
  login = async (payload) => {
    try {
      const fetchParams = {
        endpoint: '/user/login',
        method: 'POST',
        data: payload
      }
      return await this.fetchData(fetchParams)

    } catch (e) {
      throw e
    }
  }
  logout = async () => {
    try {
      const fetchParams = {
        endpoint: '/user/logout',
        method: "POST"
      }
      return await this.fetchData(fetchParams)
    } catch (e) {
      throw e
    }
  }
  registerUser = async (payload) => {
    try {
      const fetchParams = {
        endpoint: '/user/register',
        method: 'POST',
        data: payload
      }
      return await this.fetchData(fetchParams)
    } catch (e) {
      console.log(e)
      throw e
    }
  }
  confirmationUser = async (payload) => {
   try {
     const fetchParams = {
       endpoint: '/user/confirm',
       method: 'POST',
       data: payload
     }
     return await this.fetchData(fetchParams)
   } catch (e) {
     console.log(e)
     throw e
   }
  }
  registerKey = async (payload) => {
    try {
      const fetchParams = {
        endpoint: '/user/key',
        method: 'POST',
        data: payload
      }
      return await this.fetchData(fetchParams)
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  /*-------------------------------------------
  * Permission types
  *------------------------------------------*/
  getPermissionTypes = async () => {
    try {
      const fetchParams = {
        endpoint: '/user/permissions',
      }
      const response = await this.fetchData(fetchParams)
      return serverDataHandler(response, [], this.logout)
    } catch (e) {
      throw e
    }
  }

  /*------------------------------
  * Get organisation list
  *-----------------------------*/
  getOrganisationList = async () => {
    try {
      const fetchParams = {
        endpoint: '',
        method: '',
      }

      return []
    } catch (e) {
      throw e
    }
  }

  /*--------------------
  * Organisation users
  *-------------------*/
  organisationUsers = async (payload, method) => {
    try {
      const fetchParams = {
        endpoint: '',
        method: method,
        data: payload
      }
      return []
    } catch (e) {
      throw e
    }
  }


  /*----------------------
  * Get data from farm
  *---------------------*/
  getData = async ({id, endpoint}) => {
    // try {
    //   const fetchParams = {
    //     endpoint: `farm/${id}/${endpoint}`
    //   }
    //   return await this.fetchData(fetchParams)
    // } catch (e) {
    //   throw new Error(e)
    // }
    // console.log('payload', {id, endpoint})
    let data = {}
    let delay = 0

    switch (endpoint) {
      case ('manage/general'):
        data = [
          {
            name: 'Общее количество',
            value: 25
          },
          {
            name: 'Количество дойных',
            value: 15
          },
          {
            name: 'Количество сухостойных',
            value: 12
          },
          {
            name: 'Количество первотелок',
            value: 10
          },
        ]
        delay = 100
        break
      case ('manage/plot'):
        data = {
          plotData: [0,1,2,3]
        }
        delay = 200
        break
      case ('manage/info'):
        data = [
          {
            name: 'Осеменение',
            value: 0
          },
          {
            name: 'Проверить стельность',
            value: 6
          },
          {
            name: 'Запуск',
            value: 0
          },
          {
            name: 'Отел',
            value: 0
          },
        ]
        delay = 300
        break
      case ('health/plot'):
        data = {
          plotData: [0,1,2,3]
        }
        delay = 400
        break
      case ('health/info'):
        data = [
          {
            name: 'Проверить здоровье',
            value: 0
          },
          {
            name: 'Уведомление в послеотельный период',
            value: 0
          },
          {
            name: 'Питьевой статус',
            value: 0
          },
          {
            name: 'Повышение температуры',
            value: 0
          },
          {
            name: 'Уменьшение температуры',
            value: 0
          },
          {
            name: 'Уменьшение двигательной активности',
            value: 0
          },
        ]
        delay = 500
        break
      case ('reproduction/plot'):
        data = {
          plotData: [0,1,2,3]
        }
        delay = 600
        break
      case ('reproduction/info'):
        data = [
          {
            name: 'Новотельные коровы',
            value: 0
          },
          {
            name: 'Коровы нестельные',
            value: 20
          },
          {
            name: 'Беременная',
            value: 0
          },
          {
            name: 'Нерегулярный цикл',
            value: 8
          },
          {
            name: 'Коровы без половой активности',
            value: 0
          },
          {
            name: 'Анормальный репродуктивный статус',
            value: 3
          },
        ]
        delay = 700
        break
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data)
      }, delay)
    })
  }

  /*------------------------
  * Get Info data from farm
  *-----------------------*/
  getFarmInfoData = async ({id}) => {
    try {
      return {
        farm: id,
        infoData: 1,
      }
    } catch (e) {
      throw new Error(e.message)
    }
  }

  /*------------------------
  * Get Health data from farm
  *-----------------------*/
  getFarmHealthData = async ({id}) => {
    try {
      return {
        farm: id,
        healthData: 2,
      }
    } catch (e) {
      throw new Error(e.message)
    }
  }

  /*------------------------
  * Get Reproduction data from farm
  *-----------------------*/
  getFarmReproductionData = async ({id}) => {
    try {
      return {
        farm: id,
        reproductionData: 3,
      }
    } catch (e) {
      throw new Error(e.message)
    }
  }

  /*----------------------
  * Get Farm list
  * return array of objects: id, name
  *---------------------*/
  getFarmList = async () => {
    try {
      const fetchParams = {
        endpoint: '/farms',
      }
      const response = await this.fetchData(fetchParams)

      // handle server response with status
      return serverDataHandler(response, [], this.logout)
    } catch (e) {
      throw e
    }
  }

  /*----------------------
  * add new farm
  *----------------------*/
  addNewFarm = async (payload) => {
    try {
      const fetchParams = {
        endpoint: '/farms/new',
        data: payload,
        method: 'POST'
      }
      const response = await this.fetchData(fetchParams)

      // handle server response with status
      return serverDataHandler(response, null, this.logout)
    } catch (e) {
      throw e
    }
  }

  /*-----------------------
  * get animals list from farm
  *----------------------*/
  getAnimalList = async ({id}) => {
    try {
      const fetchParams = {
        endpoint: `/farms/${id}/cows`
      }
      const response = await this.fetchData(fetchParams)

      // handle server response with status
      return serverDataHandler(response, [], this.logout)
    } catch (e) {
      throw e
    }
  }

  /*--------------------
  * add new animal
  *-------------------*/
  addNewAnimal = async (payload) => {
    try {
      const fetchParams = {
        endpoint: '/cows/new',
        data: payload,
        method: 'POST'
      }
      const response = await this.fetchData(fetchParams)

      // handle server response with status
      return serverDataHandler(response, null, this.logout)
    } catch (e) {
      throw e
    }
  }

  /*------------------
  * get animal info
  *------------------*/
  getAnimalInfo = async ({id}) => {
    try {
      const fetchParams = {
        endpoint: `/cows/${id}/info`,
      }
      const response = await this.fetchData(fetchParams)

      // handle server response with status
      return serverDataHandler(response, {}, this.logout)
    } catch (e) {
      throw e
    }
  }

  /*-------------------
  * delete animal
  *------------------*/
  deleteAnimal = async (payload) => {
    try {
      const fetchParams = {
        endpoint: '/cows',
        data: payload,
        method: 'DELETE'
      }
      const response = await this.fetchData(fetchParams)

      // handle server response with status
      return serverDataHandler(response, null, this.logout)
    } catch (e) {
      throw e
    }
  }

  /*-------------------
  * animal types
  *------------------*/
  getAnimalTypes = async () => {
    try {
      const fetchParams = {
        endpoint: '/cows/types',
      }
      const response = await this.fetchData(fetchParams)

      // handle server response with status
      return serverDataHandler(response, [], this.logout)
    } catch (e) {
      throw e
    }
  }

  /*-----------------------
  * get bolus list from farm
  *----------------------*/
  getBolusList = async ({id}) => {
    try {
      const fetchParams = {
        endpoint: `/boluses/${id}`
      }
      const response = await this.fetchData(fetchParams)

      // handle server response with status
      return serverDataHandler(response, [], this.logout)
    } catch (e) {
      throw e
    }
  }

  /*-------------------
  * delete bolus
  *------------------*/
  deleteBolus = async (payload) => {
    try {
      const fetchParams = {
        endpoint: '/boluses',
        data: payload,
        method: 'DELETE'
      }
      const response = await this.fetchData(fetchParams)

      // handle server response with status
      return serverDataHandler(response, null, this.logout)
    } catch (e) {
      throw e
    }
  }

  /*--------------------
  * add new bolus
  *-------------------*/
  addNewBolus = async (payload) => {
    try {
      const fetchParams = {
        endpoint: '/boluses/new',
        data: payload,
        method: 'POST'
      }
      const response = await this.fetchData(fetchParams)

      // handle server response with status
      return serverDataHandler(response, null, this.logout)
    } catch (e) {
      throw e
    }
  }

  /*-------------------
  * bolus types
  *------------------*/
  getBolusTypes = async () => {
    try {
      const fetchParams = {
        endpoint: '/boluses/types',
      }
      const response = await this.fetchData(fetchParams)

      // handle server response with status
      return serverDataHandler(response, [], this.logout)
    } catch (e) {
      throw e
    }
  }

}

const $api = new Api()

export { $api }
