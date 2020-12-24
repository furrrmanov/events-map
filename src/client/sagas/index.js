import { all } from 'redux-saga/effects'

import {
  watchUserSingInforEmailRequest,
  watchUserSingInforGoogleAccountRequest,
} from './user'

import { watchGeolocationRequest } from './map'
import {
  watchSendEventforFirebaseBdRequest,
  watchEventsListRequest,
  watchDeleteItemforFirebaseDbRequest,
  watchUpdateItemforFirebaseDbRequest,
} from './events'
import {
  watchUploadFilesRequest,
  watchDeleteFileInFirebaseStorageRequest,
} from './files'

import {
  watchUsersProfileListRequest,
  watchUpdateUserProfileRequest,
  watchCreateUserProfileRequest,
} from './profiles'

export default function* rootSaga() {
  yield all([
    watchUserSingInforEmailRequest(),
    watchUserSingInforGoogleAccountRequest(),
    watchGeolocationRequest(),
    watchSendEventforFirebaseBdRequest(),
    watchEventsListRequest(),
    watchDeleteItemforFirebaseDbRequest(),
    watchUpdateItemforFirebaseDbRequest(),
    watchUploadFilesRequest(),
    watchUsersProfileListRequest(),
    watchDeleteFileInFirebaseStorageRequest(),
    watchUpdateUserProfileRequest(),
    watchCreateUserProfileRequest(),
  ])
}
