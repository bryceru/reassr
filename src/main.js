import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import App from './components/App';
import { getStore } from './store.js';

import './styles/index.scss';

const serverData = window.__SERVER_DATA__;
delete window.__SERVER_DATA__;

const store = getStore(serverData);

export const main = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    );
  });
};
