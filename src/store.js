import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers';
import { createBrowserHistory as createHistory } from 'history';

let history;

let composeEnhancers = compose;
if (typeof window != 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

if (typeof window != 'undefined') history = createHistory();

export const getStore = (preloadedState = {}) => {
  const loggerMware = createLogger();
  const routerMware = routerMiddleware(history);

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
