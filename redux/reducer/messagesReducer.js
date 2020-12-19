import { SUCCESS_MESSAGE, CLEAR_MESSAGE } from 'actions'

const initialState = {
  isOpen: false,
  successMessage: '',
}

export default function messages(state = initialState, { type, payload }) {
  switch (type) {
    case SUCCESS_MESSAGE:
      return {
        ...state,
        isOpen: true,
        successMessage: payload,
      }
    case CLEAR_MESSAGE:
      return {
        ...state,
        isOpen: false,
      }

    default:
      return state
  }
}