const todos = [{ id: 1, text: 'server-fetched todo' }];

export const getList = () => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(todos);
    }, 300);
  });
};

export const createItem = (newTodo = {}) => {
  return new Promise(function(resolve, reject) {
    newTodo.id = Date.now();
    todos.push(newTodo);

    resolve(newTodo);
  });
};
