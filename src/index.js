import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import configureStore from './store/configureStore'
import Root from './components/Root'
import './css/main.scss'

const store = configureStore()

delete AppContainer.prototype.unstable_handleError

const bootStrap = Component => {
  render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('app')
  )
}

bootStrap(Root)

if (module && module.hot) {
  module.hot.accept('./components/Root', () => bootStrap(Root))
}
