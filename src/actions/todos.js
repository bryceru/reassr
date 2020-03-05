import axios from 'axios';

export const getList = () => {
  return async dispatch => {
    try {
      dispatch({ type: 'GET_TODOS_LIST_START' });
      const list = await axios.get('/api/todos', { withCredentials: true });
      dispatch({ type: 'GET_TODOS_LIST_SUCCESS', list });
    } catch (e) {}
  };
};
