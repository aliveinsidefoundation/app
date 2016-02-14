import { combineReducers } from 'redux';
import playlist from './playlist';
import app from './app';

const rootReducer = combineReducers({
  playlist,
  app
});

export default rootReducer;
