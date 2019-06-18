import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'

import reducers from '../reducers'

const reduxDevTool = () => {
  return typeof window === 'object' &&
  typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : f => f
}

export default (initialState = {}, history) => {
  const middleware = [
    routerMiddleware(history),
    thunk
  ]

  let enhancers = [
    applyMiddleware(...middleware),
  ]

  if (process.env.NODE_ENV !== 'production') {
    enhancers = [
      ...enhancers,
      reduxDevTool()
    ]
  }

  const configureStore = compose(
    ...enhancers
  )(createStore)

  const store = configureStore(reducers, initialState)
  return store
}
