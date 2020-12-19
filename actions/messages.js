export const SUCCESS_MESSAGE = 'SUCCESS_MESSAGE'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

export const showSuccessSnackbar = (message) => ({
  type: SUCCESS_MESSAGE,
  payload: message,
})

export const clearSnackbar = () => ({
  type: CLEAR_MESSAGE,
})
