export const GET_GELOCATION_REQUEST = 'GET_GELOCATION_REQUEST'
export const SET_USER_COORDINATES = 'GET_USER_COORDINATES'

export const getGeolocationRequest = () => ({
  type: GET_GELOCATION_REQUEST,
})

export const setUserGeolocationCoordinates = (value) => ({
  type: SET_USER_COORDINATES,
  payload: value,
})
