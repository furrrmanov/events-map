import {
  SET_USER_INFO,
  LOGOUT_USER,
  SET_USER_REQUEST_FOR_EMAIL,
  SET_USER_REQUEST_FOR_GOOGLE_ACCOUNT,
} from 'actions'

const initialState = {
  isLogged: false,
  email: '',
  name: '',
  photoUrl: '',
}

export default function user(state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER_REQUEST_FOR_EMAIL:
      return {
        ...state,
      }

    case SET_USER_REQUEST_FOR_GOOGLE_ACCOUNT:
      return {
        ...state,
      }

    case SET_USER_INFO:
      return {
        ...state,
        isLogged: true,
        email: payload.email,
        name: payload.name,
        photoUrl: payload.photoUrl,
      }

    case LOGOUT_USER:
      return {
        ...state,
        ...state.user,
        isLogged: payload,
      }

    default:
      return state
  }
}
