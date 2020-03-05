import { getStore } from '../store.js';

const store = getStore();

export function todosApi(http) {
  return {
    all: () => {
      return http.get('/api/todos').then(list => {
        console.log('HTPT READY ', list);
        store.dispatch({ type: 'GET_TODOS_LIST_SUCCESS', list });
      });
    },

    create: newTodo => {
      return http.post('/api/todos', newTodo);
    }
  };
}
