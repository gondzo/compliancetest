import { RootEpic } from '@src/types';
import * as Rx from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { concat as concat$ } from 'rxjs/observable/concat';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as APIService from '@src/services/APIService';
import {
  resultLoaded,
  refresh,
  errorOccurred,
  setIsRefreshing,
  clearError,
} from '@src/modules/reports/actions';
import { of as of$ } from 'rxjs/observable/of';

// handler when loading '/reports' page
export const loadInitialDataEpic: RootEpic = action$ =>
  action$.pipe(
    Rx.filter(
      action =>
        action.type === LOCATION_CHANGE &&
        action.payload.pathname === '/reports',
    ),
    Rx.switchMap(() => {
      return APIService.getJobResult().pipe(
        Rx.map(resultLoaded),
        Rx.catchError(() => {
          return of$(
            errorOccurred(
              'Cannot load the job result. Please refresh the page.',
            ),
          );
        }),
      );
    }),
  );

export const refreshEpic: RootEpic = action$ =>
  action$.pipe(
    Rx.filter(isActionOf(refresh)),
    Rx.switchMap(() => {
      return concat$(
        of$(setIsRefreshing(true)),
        of$(clearError()),
        APIService.refreshJob().pipe(
          Rx.ignoreElements<any>(),
          Rx.catchError(() => {
            return of$(
              errorOccurred('An error occurred. Couldn\'t refresh the data.'),
            );
          }),
        ),
        of$(setIsRefreshing(false)),
      );
    }),
  );
