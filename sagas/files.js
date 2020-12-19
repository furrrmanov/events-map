import { takeEvery, select, put, call } from 'redux-saga/effects'

import { SET_UPLOUD_FILES_REQUEST, SET_DELETE_FILE_REQUEST, usersProfileListRequest } from 'actions'

import {
  deleteItemFromFirebaseStorage,
  uploadFileToFirebaseStorage,
  updateUserProfilesInFirebaseDb,
} from 'utils/fireBase'

export function* watchUploadFilesRequest() {
  yield takeEvery(SET_UPLOUD_FILES_REQUEST, workerUploadFileToFirebaseStorage)
}

function* workerUploadFileToFirebaseStorage({ value }) {
  const state = yield select()
  const file = yield call(uploadFileToFirebaseStorage, value, state.user.email)
  const fileType = yield file.getMetadata()
  const fileRef = yield file.getDownloadURL()

  const modifiedProfile = {
    ...state.profiles.userProfile,
    iconName: file.name,
    iconType: fileType.contentType,
    iconUrl: fileRef,
  }

  yield call(updateUserProfilesInFirebaseDb, {
    collectionName: '/userProfiles',
    collectionRoot: 'userProfiles/',
    profile: modifiedProfile,
  })
  yield put(usersProfileListRequest())
}

export function* watchDeleteFileInFirebaseStorageRequest() {
  yield takeEvery(SET_DELETE_FILE_REQUEST, workerDeleteItemInFirebaseStorage)
}

function* workerDeleteItemInFirebaseStorage() {
  const state = yield select()
  const profile = state.profiles.userProfile

  const modifiedProfile = {
    ...state.profiles.userProfile,
    iconName: '',
    iconType: '',
    iconUrl: '',
  }

  yield call(updateUserProfilesInFirebaseDb, {
    collectionName: '/userProfiles',
    collectionRoot: 'userProfiles/',
    profile: modifiedProfile,
  })

  yield call(deleteItemFromFirebaseStorage, profile.iconName)
  yield put(usersProfileListRequest())
}
