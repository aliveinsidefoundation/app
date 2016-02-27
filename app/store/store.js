import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleWare from 'redux-thunk';

import rootReducer from '../reducers';

// export default () => {
//   return createStore(rootReducer, applyMiddleware(thunk));
// };


const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleWare),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default () => {
  return createStoreWithMiddleware(rootReducer);
};
