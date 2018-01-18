import { RootEpic } from '@src/types';
import * as Rx from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { empty as $empty } from 'rxjs/observable/empty';
import { concat as concat$ } from 'rxjs/observable/concat';
import { of as of$ } from 'rxjs/observable/of';
import {
  LOCATION_CHANGE,
  LocationChangeAction,
  replace,
} from 'react-router-redux';
import * as queryString from 'query-string';
import * as APIService from '@src/services/APIService';
import {loading, userLoaded, errorOccurred, logout} from './actions';

// handler when loading '/' page
export const loadInitialDataEpic: RootEpic = (action$, { getState }) =>
  action$.pipe(
    Rx.filter(
      action =>
        action.type === LOCATION_CHANGE && action.payload.pathname === '/',
    ),
    Rx.switchMap((action: LocationChangeAction) => {
      const { user } = getState().global;
      if (user) {
        return $empty();
      }
      const fetchUser = () => APIService.getMe().pipe(
        Rx.map(userLoaded),
        Rx.catchError(() => {
          APIService.clearToken();
          return of$(errorOccurred('Cannot load the user. Please refresh the page.'));
        })
      );
      const query = queryString.parse(action.payload.search);
      // callback for authentication
      if (query.token) {
        APIService.setToken(query.token);
        return concat$(
          of$(replace('/')),
          of$(loading()),
          fetchUser(),
          of$(replace('/reports')),
        );
      }
      // an error occurred
      if (query.error) {
        return concat$(
          of$(replace('/')),
          of$(errorOccurred(query.error)),
        );
      }
      // already logged in
      if (APIService.hasToken()) {
        return concat$(
          of$(loading()),
          fetchUser(),
          of$(replace('/reports')),
        );
      }
      // do nothing (show login link)
      return $empty();
    }),
  );

// logout the user
export const logoutEpic: RootEpic = (action$) =>
  action$.pipe(
    Rx.filter(isActionOf(logout)),
    Rx.mergeMap(() => {
      return concat$(
        APIService.logout().pipe(Rx.ignoreElements()),
        of$(replace('/')),
      );
    })
  );
