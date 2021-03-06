import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk'

export default (preloadedState = {}) => createStore(
  rootReducer, 
  preloadedState, 
  applyMiddleware( thunk )
)