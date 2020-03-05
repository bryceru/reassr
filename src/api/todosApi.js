import * as TODOS from '../constants/todos';
import { getStore } from '../store.js';

const store = getStore();

export function todosApi(http) {
  return {
    all: () => {
      return http.get(TODOS.API_URL).then(list => {
        store.dispatch({ type: TODOS.GET_LIST_SUCCESS, list });
      });
    },

    create: newTodo => {
      return http.post(TODOS.API_URL, newTodo);
    }
  };
}
