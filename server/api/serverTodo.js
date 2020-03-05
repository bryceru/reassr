const todos = [{ id: 1, text: 'server-fetched todo' }];

export const getList = (timeout = 100) => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(todos);
    }, timeout);
  });
};

export const createItem = (item = {}) => {
  return new Promise(function(resolve, reject) {
    item.id = Date.now();
    todos.push(item);

    resolve(item);
  });
};
