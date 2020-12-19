import { takeEvery, put, call } from 'redux-saga/effects'

import {
  singInWithEmailUsingFirebase,
  singInWithGoogleAccountUsingFirebase,
} from 'utils/fireBase'
import {
  SET_USER_REQUEST_FOR_EMAIL,
  SET_USER_REQUEST_FOR_GOOGLE_ACCOUNT,
  setUserInfo,
} from 'actions'
import { tarnsformUserInfoData } from 'utils/dataMappers'

export function* watchUserSingInforEmailRequest() {
  yield takeEvery(SET_USER_REQUEST_FOR_EMAIL, workerUserSigninForEmail)
}

function* workerUserSigninForEmail({ payload }) {
  const data = yield call(
    singInWithEmailUsingFirebase,
    payload.userEmail,
    payload.userPassword
  )
  yield put(setUserInfo(tarnsformUserInfoData(data)))
}

export function* watchUserSingInforGoogleAccountRequest() {
  yield takeEvery(
    SET_USER_REQUEST_FOR_GOOGLE_ACCOUNT,
    workerUserSigninForGoogleAccount
  )
}

function* workerUserSigninForGoogleAccount() {
  const data = yield call(singInWithGoogleAccountUsingFirebase)
  yield put(setUserInfo(tarnsformUserInfoData(data)))
}
