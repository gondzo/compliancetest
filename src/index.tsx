/**
 * Main entry file
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createHashHistory';
import createStore from './store/createStore';

const history = createHistory();
const store = createStore(history);

const MOUNT_NODE = document.getElementById('root');

// function renderError(options: { render: () => any }) {
//   return () => {
//     try {
//       options.render();
//     } catch (error) {
//       const RedBox = require('redbox-react').default;
//
//       ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
//       throw error;
//     }
//   };
// }

let render = () => {
  const App = require('./components/App').default;

  ReactDOM.render(
    <AppContainer>
      <App store={store} history={history} />
    </AppContainer>,
    MOUNT_NODE,
  );
};

render();

// Hot Module Replacement API
declare let module: { hot: any };

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render();
  });
}
