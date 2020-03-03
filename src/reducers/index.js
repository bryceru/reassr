import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import todosReducer from './todos';

const rootReducer = combineReducers({
  todos: todosReducer,
  routing: routerReducer
});

export default rootReducer;
