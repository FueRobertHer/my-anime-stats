import { combineReducers } from 'redux';
import entitiesReducer from './entitiesReducer.js';
import errorsReducer from './errorsReducer';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  errors: errorsReducer,
  ui: uiReducer,
});

export default rootReducer;