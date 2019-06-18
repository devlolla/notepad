import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Main from './views/Main'

export default (props) => {
  return (
    <Switch>
      <Route exact path='/'
        component={() => <Main {...props} />}
      />
    </Switch>
  )
}
