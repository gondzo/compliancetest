import { createAction } from 'react-redux-typescript';
import { JobResult } from '@src/types';

export const resultLoaded = createAction(
  'reports/RESULT_LOADED',
  (result: JobResult) => ({
    type: 'reports/RESULT_LOADED',
    payload: result,
  }),
);

export const errorOccurred = createAction(
  'reports/ERROR_OCCURRED',
  (error: string) => ({
    type: 'reports/ERROR_OCCURRED',
    payload: error,
  }),
);

export const refresh = createAction('reports/REFRESH');
export const clearError = createAction('reports/CLEAR_ERROR');
export const setIsRefreshing = createAction(
  'reports/SET_IS_REFRESHING',
  (isRefreshing: boolean) => ({
    type: 'reports/SET_IS_REFRESHING',
    payload: isRefreshing,
  }),
);
