import axios from 'axios'

// import { GEOLOCATION_APY_KEY } from 'constants.js'

export const getGeolocationPoint = () => {
  return axios.get(`https://ipinfo.io/?token=feb304c4e835c3`)
}

export const setRequestForCreatingNotificationInNextJsApi = (value) => {
  return axios.post('/api/notifications', value)
}

export const setRequestForDeleteNotificationInNextJsApi = (value) => {
  return axios.delete('/api/notifications', value)
}
