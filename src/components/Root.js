import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import Routes from './Routes'

export default (props) =>
  <Router>
    <Routes {...props} />
  </Router>
