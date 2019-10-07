import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { loadReducer } from '../reducers/index'

let middleWare = [thunk]

export interface LoadState {
  loading: boolean
}

const store = createStore(loadReducer, applyMiddleware(...middleWare))

export default store
