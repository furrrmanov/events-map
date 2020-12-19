import { SET_EVENTS_LIST_REQUEST, SET_EVENTS_LIST } from 'actions'

const initialState = {
  eventsList: [],
}

export default function event(state = initialState, { type, payload }) {
  switch (type) {
    case SET_EVENTS_LIST_REQUEST:
      return {
        ...state,
      }

    case SET_EVENTS_LIST: {
      return {
        ...state,
        eventsList: payload,
      }
    }

    default:
      return state
  }
}
