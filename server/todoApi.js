import { Router } from 'express';

import { getList, createItem } from './api/serverTodo';

export const todoRoutes = () => {
  const todoRoutes = new Router();

  todoRoutes.get('/api/todos', (_req, res) => {
    getList(1500).then(list => {
      res.json(list);
    });
  });

  todoRoutes.post('/api/todos', (req, res) => {
    createItem(req.body).then(item => {
      res.json(item);
    });
  });

  return todoRoutes;
};
