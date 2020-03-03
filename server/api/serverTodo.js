export const getList = () => {
  return new Promise(function(resolve, reject) {
    const todos = [{ id: 1, text: 'server-fetched todo' }];

    setTimeout(function() {
      resolve(todos);
    }, 300);
  });
};
