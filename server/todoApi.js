import { Router } from 'express';

import { getList } from './api/serverTodo';

export const todoRoutes = () => {
  const todoRoutes = new Router();

  todoRoutes.get('/api/todos', (_req, res) => {
    getList().then(function(list) {
      console.log('prmoised list', list);
      res.json(list);
    });
  });

  todoRoutes.post('/api/todos', (req, res) => {
    const newTodo = req.body;
    newTodo.id = Date.now();

    //todos.push(newTodo); //TODO

    setTimeout(() => {
      res.json(newTodo);
    }, 100);
  });

  return todoRoutes;
};
