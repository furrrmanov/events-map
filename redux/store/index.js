import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'

import rootReducer from 'redux/reducer'
import rootSaga from 'sagas'
import { loadState, saveState } from 'utils/localstorage'

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

  store.sagaTask = sagaMiddleware.run(rootSaga)

  store.subscribe(() => {
    saveState(store.getState())
  })

  return store
}


export const wrapper = createWrapper(makeStore, { debug: true })
