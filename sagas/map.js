import { takeEvery, put, call } from 'redux-saga/effects'

import { GET_GELOCATION_REQUEST, setUserGeolocationCoordinates } from 'actions'
import { getGeolocationPoint } from 'services/axios'

export function* watchGeolocationRequest() {
  yield takeEvery(GET_GELOCATION_REQUEST, workerUserGeolocationPoint)
}

function* workerUserGeolocationPoint() {
  const location = yield call(getGeolocationPoint)
  yield put(
    setUserGeolocationCoordinates([
      location.data.loc.split(',')[0],
      location.data.loc.split(',')[1],
    ])
  )
}
