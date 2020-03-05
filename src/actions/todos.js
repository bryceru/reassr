import axios from 'axios';

export const getList = () => {
  return async dispatch => {
    try {
      console.log('action get list');

      dispatch({ type: 'GET_TODOS_LIST_START' });
      const response = await axios.get('/api/todos', { withCredentials: true });

      dispatch({ type: 'GET_TODOS_LIST_SUCCESS', list: response.data });
    } catch (e) {}
  };
};
