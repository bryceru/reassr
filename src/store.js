import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers';
import { createBrowserHistory as createHistory } from 'history';

let composeEnhancers = compose;
if (typeof window != 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

// export const history = createHistory({ basename: '/crm' }); //TODO
// export const history = createHistory(); //TODO

export const getStore = (preloadedState = {}) => {
  const loggerMware = createLogger();
  // Build the middleware for intercepting and dispatching navigation actions
  const routerMware = routerMiddleware();

  console.log('store', preloadedState);

  const middleware = [thunkMiddleware, routerMware];
  const isLoggerEnabled =
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'devserver';
  if (isLoggerEnabled) middleware.push(loggerMware);

  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware))
  );
};
