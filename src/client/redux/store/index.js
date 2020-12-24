import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'

import rootReducer from 'src/client/redux/reducer'
import rootSaga from 'src/client/sagas'
import { loadState, saveState } from 'src/client/utils/localstorage'

export var directStore

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware()
  const persistedState = loadState()
  const store = createStore(
    rootReducer,
    persistedState,
    bindMiddleware([sagaMiddleware])
  )

  directStore = store
  store.sagaTask = sagaMiddleware.run(rootSaga)

  store.subscribe(() => {
    saveState(store.getState())
  })

  return store
}


export const wrapper = createWrapper(makeStore, { debug: true })
