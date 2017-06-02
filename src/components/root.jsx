import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from '../routes'

export default class Root extends Component {
  render () {
    const { store } = this.props
    return (
      <Provider store={store}>

        <Router>
          <App />

        </Router>

      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}
