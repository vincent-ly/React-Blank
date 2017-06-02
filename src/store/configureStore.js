import { createStore } from 'redux'
import rootReducer from './rootReducer'
// import DevTools from '../containers/DevTools';

export default function configureStore (initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState

  )

  return store
}
