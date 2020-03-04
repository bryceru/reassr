import React from 'react';
import ssrPrepass from 'react-ssr-prepass';
import chalk from 'chalk';

export const fetchDataForRender = (ServerApp, req, store) => {
  return ssrPrepass(<ServerApp location={req.url} />, element => {
    if (element && element.type && element.type.fetchData) {
      return element.type.fetchData(store, req);
    }
  }).then(() => {
    console.log('tHEN FETCT', store.getState());
    return store.getState();
  });
};

function logDuplicateKeyMessage(key, component) {
  /* eslint-disable no-console */
  console.log('');
  console.log(
    chalk.red(
      `Warning: <${component} /> is overwriting an existing server data value for "${key}".`
    )
  );
  console.log(chalk.red('This can cause unexpected behavior.'));
  console.log('');
}
