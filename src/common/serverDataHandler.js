import { Notify } from 'quasar'


const serverDataHandler = (response, defaultValue, logout) => {
  const {data, status, message, error} = response

  let userMessage = ''
  let resultData = null

  switch (status) {
    // good request
    case 200:
      resultData = data
      break

    // new data success
    case 201:
      userMessage = 'данные успешно добавлены'
      break

    // delete data
    case 202:
      userMessage = 'данные успешно удалены'
      break

    // no data
    case 204:
      resultData = defaultValue
      break

    // payload error
    case 400:
      console.log(message)
      break

    // user no auth
    case 401:
      logout()
      userMessage = 'пользователь не аутентифицирован'
      break

    // new data exist
    case 409:
      userMessage = 'Невозможно добавить уже существующие данные'
      break

    // server error
    case 500:
      console.log(message)
      break

    default:
      console.log(message)
  }

  // send message to user
  if (userMessage) {
    Notify.create({
      color: error ? 'red-5': 'green-4',
      textColor: 'white',
      icon: error ? 'warning' :'cloud_done',
      message: userMessage
    })
  }

  return resultData

}

export default serverDataHandler
