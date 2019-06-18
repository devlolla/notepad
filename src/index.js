import 'es6-shim'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createHashHistory'
import configureStore from './store'
import Root from './components/Root'
import './scss/public.scss'

const history = createHistory()
const store = configureStore({}, history)

render(
  <Provider store={store}>
    <Root history={history} />
  </Provider>,
  document.getElementById('root')
)
