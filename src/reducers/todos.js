import * as TODOS from '../constants/todos';

const initialState = {
  isGetting: false,
  isPosting: false,
  list: []
};

const assignTodos = (state, data) =>
  Object.assign({}, state, {
    ...data
  });

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case TODOS.GET_LIST_START:
      return assignTodos(state, {
        isGetting: true
      });

    case TODOS.GET_LIST_SUCCESS:
      return assignTodos(state, {
        list: action.list,
        isGetting: false
      });

    case TODOS.POST_ITEM_START:
      return assignTodos(state, {
        isPosting: true
      });

    case TODOS.POST_ITEM_SUCCESS:
      return assignTodos(state, {
        isPosting: false,
        list: [...state.list, action.item]
      });

    default:
      return state;
  }
}
