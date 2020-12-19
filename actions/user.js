export const SET_USER_REQUEST_FOR_EMAIL = 'SET_USER_REQUEST_FOR_EMAIL'
export const SET_USER_INFO = 'SET_USER_INFO'
export const LOGOUT_USER = 'LOGOUT_USER'
export const SET_USER_REQUEST_FOR_GOOGLE_ACCOUNT =
  'SET_USER_REQUEST_FOR_GOOGLE_ACCOUNT'

export const setUserInfo = (value) => ({
  type: SET_USER_INFO,
  payload: value,
})

export const userLogOut = (value) => ({
  type: LOGOUT_USER,
  payload: value,
})

export const SetUserSingInEmailRequest = (value) => ({
  type: SET_USER_REQUEST_FOR_EMAIL,
  payload: value,
})

export const SetUserSingInWithGoogleRequest = () => ({
  type: SET_USER_REQUEST_FOR_GOOGLE_ACCOUNT,
})
