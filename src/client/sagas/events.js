import { takeEvery, put, call, select } from 'redux-saga/effects'

import {
  sendItemInFirebaseDb,
  getEventsListFirebaseDB,
  deleteItemFromFirebaseDb,
  updateItemFromFirebaseDb,
} from 'src/client/utils/fireBase'
import {
  SET_REQUEST_ON_SEND_EVENT_IN_FIREBASE,
  SET_EVENTS_LIST_REQUEST,
  SET_TO_DELETE_ITEM_IN_FIREBASE_REQUEST,
  setEventList,
  SET_TO_UPDATE_ITEM_IN_FIREBASE_REQUEST,
  getEventListFromFirebaseDb,
  showSuccessSnackbar,
} from 'src/client/actions'
import {
  transformDataList,
  filteringDeletedEvents,
} from 'src/client/utils/dataMappers'
import {
  setRequestForCreatingNotificationInNextJsApi,
  setRequestForDeleteNotificationInNextJsApi,
} from 'src/client/services/axios'

export function* watchSendEventforFirebaseBdRequest() {
  yield takeEvery(SET_REQUEST_ON_SEND_EVENT_IN_FIREBASE, workerSendUserEvent)
}

function* workerSendUserEvent({ payload }) {
  const state = yield select()

  try {
    const event = yield call(sendItemInFirebaseDb, payload)

    yield put(getEventListFromFirebaseDb())

    const response = yield setRequestForCreatingNotificationInNextJsApi({
      event: payload,
      eventId: event.getKey(),
      notificationOption: state.profiles.userProfile,
      userDivicesToken: state.profiles.userProfile.devicesToken,
    })

    if (response.data.status === 'ok') {
      yield put(showSuccessSnackbar('event created !'))
    }
  } catch (error) {}
}

export function* watchEventsListRequest() {
  yield takeEvery(SET_EVENTS_LIST_REQUEST, workerEventsList)
}

function* workerEventsList() {
  const data = yield getEventsListFirebaseDB()

  yield put(setEventList(filteringDeletedEvents(transformDataList(data))))
}

export function* watchDeleteItemforFirebaseDbRequest() {
  yield takeEvery(
    SET_TO_DELETE_ITEM_IN_FIREBASE_REQUEST,
    workerDeleteItemForFirebase
  )
}

function* workerDeleteItemForFirebase({ payload }) {
  try {
    yield call(deleteItemFromFirebaseDb, payload)

    yield put(getEventListFromFirebaseDb())

    const response = yield setRequestForDeleteNotificationInNextJsApi({
      data: { iventId: payload.itemId },
    })

    if (response.data.status === 'ok') {
      yield put(showSuccessSnackbar('event deleted !'))
    }
  } catch (error) {}
}

export function* watchUpdateItemforFirebaseDbRequest() {
  yield takeEvery(
    SET_TO_UPDATE_ITEM_IN_FIREBASE_REQUEST,
    workerUpdateItemForFirebase
  )
}

function* workerUpdateItemForFirebase({ payload }) {
  const state = yield select()
  try {
    yield call(updateItemFromFirebaseDb, payload)

    yield put(getEventListFromFirebaseDb())

    yield setRequestForDeleteNotificationInNextJsApi({
      data: { iventId: payload.editEventId },
    })

    const response = yield setRequestForCreatingNotificationInNextJsApi({
      event: payload.data,
      eventId: payload.editEventId,
      owner: state.user.email,
      userDivicesToken: state.profiles.userProfile.devicesToken,
    })

    if (response.data.status === 'ok') {
      yield put(showSuccessSnackbar('event edited'))
    }
  } catch (error) {}
}
