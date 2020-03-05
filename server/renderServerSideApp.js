import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

import App from '../src/components/App';
import { fetchDataForRender } from './fetchDataForRender';
import { indexHtml } from './indexHtml';
import stats from '../build/react-loadable.json';

import { Provider } from 'react-redux';
import { getStore } from '../src/store';

const ServerApp = ({ context, location }) => {
  const store = getStore();

  return (
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );
};

export const renderServerSideApp = (req, res) => {
  const store = getStore();

  Loadable.preloadAll()
    .then(() => fetchDataForRender(ServerApp, req, store))
    .then(a => {
      return renderApp(ServerApp, req, res, store);
    });
};

function renderApp(ServerApp, req, res, store) {
  const context = {};
  const modules = [];

  const markup = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <ServerApp location={req.url} context={context} store={store} />
    </Loadable.Capture>
  );

  if (context.url) {
    res.redirect(context.url);
  } else {
    const fullMarkup = indexHtml({
      helmet: Helmet.renderStatic(),
      serverData: store.getState(),
      bundles: getBundles(stats, modules),
      markup
    });

    res.status(200).send(fullMarkup);
  }
}
