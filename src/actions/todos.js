import * as TODOS from '../constants/todos';
import axios from 'axios';

export const getList = () => {
  return async dispatch => {
    try {
      dispatch({ type: TODOS.GET_LIST_START });
      const response = await axios.get('/api/todos', { withCredentials: true });

      dispatch({ type: TODOS.GET_LIST_SUCCESS, list: response.data });
    } catch (e) {}
  };
};

export const createItem = item => {
  return async dispatch => {
    try {
      dispatch({ type: TODOS.POST_ITEM_START });
      const response = await axios.post('/api/todos', item);

      dispatch({ type: TODOS.POST_ITEM_SUCCESS, item: response.data });
    } catch (e) {}
  };
};
