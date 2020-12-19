export const SET_REQUEST_ON_SEND_EVENT_IN_FIREBASE =
  'SET_REQUEST_ON_SEND_EVENT_IN_FIREBASE'
export const SET_EVENTS_LIST_REQUEST = 'SET_EVENTS_LIST_REQUEST'
export const SET_EVENTS_LIST = 'SET_EVENTS_LIST'
export const SET_TO_DELETE_ITEM_IN_FIREBASE_REQUEST =
  'SET_TO_DELETE_ITEM_IN_FIREBASE_REQUEST'
export const SET_TO_UPDATE_ITEM_IN_FIREBASE_REQUEST =
  'SET_TO_UPDATE_ITEM_IN_FIREBASE_REQUEST'

export const getRequestOnSendEventInFirebaseDb = (value) => ({
  type: SET_REQUEST_ON_SEND_EVENT_IN_FIREBASE,
  payload: value,
})

export const getEventListFromFirebaseDb = (value) => ({
  type: SET_EVENTS_LIST_REQUEST,
})

export const setEventList = (value) => ({
  type: SET_EVENTS_LIST,
  payload: value,
})

export const getDeleteItemRequest = (value) => ({
  type: SET_TO_DELETE_ITEM_IN_FIREBASE_REQUEST,
  payload: value,
})

export const getUpdateItemRequest = (value) => ({
  type: SET_TO_UPDATE_ITEM_IN_FIREBASE_REQUEST,
  payload: value,
})
