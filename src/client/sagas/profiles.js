import { takeEvery, put, select, call } from 'redux-saga/effects'

import localforage from 'localforage'

import {
  USERS_PROFILE_LIST_REQUEST,
  setUsersProfileList,
  setUserProfile,
  UPDATE_USER_PROFILE_REQUEST,
  usersProfileListRequest,
  CREATE_USER_PROFILE_REQUEST,
  createUserProfileRequest,
} from 'src/client/actions'

import {
  getUsersProfileListFirebaseDb,
  createUserProfileInFirebaseDb,
  updateUserProfilesInFirebaseDb,
} from 'src/client/utils/fireBase'
import { transformDataList } from 'src/client/utils/dataMappers'
import { firebaseCloudMessaging } from 'src/client/utils/fireBase/webPushNotifications'

export function* watchUsersProfileListRequest() {
  yield takeEvery(USERS_PROFILE_LIST_REQUEST, workerUsersProfileList)
}

function* workerUsersProfileList() {
  const state = yield select()
  const userDeviceToken = yield firebaseCloudMessaging.init()
  const usersProfileList = yield call(getUsersProfileListFirebaseDb)
  const userProfile = yield transformDataList(usersProfileList).find(
    (item) => item.owner === state.user.email
  )

  if (userProfile) {
    if (userDeviceToken) {
      const DevicesTokenList = userProfile.devicesToken

      yield DevicesTokenList.push(userDeviceToken)

      const modifiedProfile = {
        ...userProfile,
        devicesToken: DevicesTokenList,
      }

      yield put(setUserProfile(modifiedProfile))
      yield call(updateUserProfilesInFirebaseDb, {
        collectionName: '/userProfiles',
        collectionRoot: 'userProfiles/',
        profile: modifiedProfile,
      })
    } else {
      yield put(setUserProfile(userProfile))
    }

    yield put(setUsersProfileList(transformDataList(usersProfileList)))
  } else {
    yield put(createUserProfileRequest())
  }
}

export function* watchCreateUserProfileRequest() {
  yield takeEvery(CREATE_USER_PROFILE_REQUEST, workerCreateUserProfile)
}

function* workerCreateUserProfile() {
  const state = yield select()
  const userDeviceToken = yield localforage.getItem('fcm_token')
  const DeviceTokenList = []
  DeviceTokenList.push(userDeviceToken)

  const modifiedProfile = {
    ...state.profiles.userProfile,
    owner: state.user.email,
    devicesToken: DeviceTokenList,
  }

  yield put(setUserProfile(modifiedProfile))

  yield call(createUserProfileInFirebaseDb, modifiedProfile)

  yield put(usersProfileListRequest())

  yield console.log('create user profile')
}

export function* watchUpdateUserProfileRequest() {
  yield takeEvery(UPDATE_USER_PROFILE_REQUEST, workerUpdateUserProfile)
}

function* workerUpdateUserProfile({ value }) {
  yield call(updateUserProfilesInFirebaseDb, value)
  yield put(usersProfileListRequest())
}
