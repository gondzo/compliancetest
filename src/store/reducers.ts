import { routerReducer as router } from 'react-router-redux';
import { combineReducers } from 'redux';
import global from '../modules/global/reducer';
import reports from '../modules/reports/reducer';

export const makeRootReducer = () =>
  combineReducers({
    router,
    global,
    reports,
  });

export default makeRootReducer;
