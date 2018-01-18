import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import epics from './epics';
import { makeRootReducer } from './reducers';
import {History} from 'history';


// Hot Module Replacement API
declare let module: { hot: any };

export default (history: History) => {
  const epicMiddleware = createEpicMiddleware(epics);
  const middleware = [epicMiddleware, routerMiddleware(history)];
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(
      createLogger({
        collapsed: true,
      }),
    );
  }
  const store = createStore(
    makeRootReducer(),
    compose(applyMiddleware(...middleware)),
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;

      store.replaceReducer(reducers());
    });
    module.hot.accept('./epics', () => {
      const newEpics = require('./epics').default;

      epicMiddleware.replaceEpic(newEpics);
    });
  }
  return store;
};
