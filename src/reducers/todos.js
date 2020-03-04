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
    case 'GET_TODOS_LIST_SUCCESS':
      console.log('calls GET_TODOS_LIST_SUCCESS', action.list);
      return assignTodos(state, {
        list: action.list,
        isGetting: false
      });

    default:
      return state;
  }
}
