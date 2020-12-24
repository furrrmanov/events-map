export const USERS_PROFILE_LIST_REQUEST = 'USERS_PROFILE_LIST_REQUEST'
export const SET_USERS_PROFILE_LIST = 'SET_USERS_PROFILE_LIST'
export const SET_USER_PROFILE = 'SET_USER_PROFILE'
export const UPDATE_USER_PROFILE_REQUEST = 'UPDATE_USER_PROFILE_REQUEST'
export const CREATE_USER_PROFILE_REQUEST = 'CREATE_USER_PROFILE_REQUEST'

export const usersProfileListRequest = () => ({
  type: USERS_PROFILE_LIST_REQUEST,
})

export const createUserProfileRequest = () => ({
  type: CREATE_USER_PROFILE_REQUEST,
})

export const updateUserProfileRequest = (value) => ({
  type: UPDATE_USER_PROFILE_REQUEST,
  value,
})

export const setUsersProfileList = (value) => ({
  type: SET_USERS_PROFILE_LIST,
  payload: value,
})

export const setUserProfile = (value) => ({
  type: SET_USER_PROFILE,
  payload: value,
})
