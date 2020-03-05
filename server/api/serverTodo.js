const todos = [{ id: 1, text: 'server-fetched todo' }];

export const getList = (timeout = 100) => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(todos);
    }, timeout);
  });
};

export const createItem = (newTodo = {}) => {
  return new Promise(function(resolve, reject) {
    newTodo.id = Date.now();
    todos.push(newTodo);

    resolve(newTodo);
  });
};
