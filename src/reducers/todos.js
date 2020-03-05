const initialState = {
  isGetting: false,
  list: []
};

const assignTodos = (state, data) =>
  Object.assign({}, state, {
    ...data
  });

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_TODOS_LIST_START':
      return assignTodos(state, {
        isGetting: true
      });

    case 'GET_TODOS_LIST_SUCCESS':
      return assignTodos(state, {
        list: action.list,
        isGetting: false
      });

    default:
      return state;
  }
}
