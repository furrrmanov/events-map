import { GET_GELOCATION_REQUEST, SET_USER_COORDINATES } from 'src/client/actions'

const initialState = {
  userLocation: {
    coordinates: [],
  },
}

export default function map(state = initialState, { type, payload }) {
  switch (type) {
    case GET_GELOCATION_REQUEST:
      return {
        ...state,
      }

    case SET_USER_COORDINATES:
      return {
        ...state,
        userLocation: {
          coordinates: payload
        }
      }

    default:
      return state
  }
}
