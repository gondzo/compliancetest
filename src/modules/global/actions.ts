import { createAction } from 'react-redux-typescript';
import { User } from '@src/types';

export const userLoaded = createAction('global/USER_LOADED', (user: User) => ({
  type: 'global/USER_LOADED',
  payload: user,
}));

export const errorOccurred = createAction(
  'global/ERROR_OCCURRED',
  (error: string) => ({
    type: 'global/ERROR_OCCURRED',
    payload: error,
  }),
);

export const loading = createAction('global/LOADING');

export const logout = createAction('global/LOGOUT');
