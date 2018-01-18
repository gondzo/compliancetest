/**
 * The backend API.
 */
import request from 'superagent';
import {fromPromise} from 'rxjs/observable/fromPromise';
import * as R from 'ramda';
import {JobResult, User} from '@src/types';

/**
 * Set the access token
 * @param {string} token
 */
export const setToken = (token: string) => {
  localStorage.token = token;
};

/**
 * Remove the access token
 */
export const clearToken = () => {
  delete localStorage.token;
};

/**
 * Check if the access token exists
 */
export const hasToken = () => !!localStorage.token;

/**
 * Get current user
 */
export const getMe = () => fromPromise(request
  .get(API_URL + '/api/me')
  .set('Authorization', 'Bearer ' + localStorage.token)
  .then<User>(R.prop('body')),
);

/**
 * Get the latest job result
 */
export const getJobResult = () => fromPromise(request
  .get(API_URL + '/api/job/result')
  .set('Authorization', 'Bearer ' + localStorage.token)
  .then<JobResult>(R.prop('body')),
);

/**
 * Logout
 */
export const logout = () => fromPromise(request
  .post(API_URL + '/api/logout')
  .set('Authorization', 'Bearer ' + localStorage.token)
  .catch((e) => {
    console.error('cannot logout', e);
  })
  .then(() => {
    clearToken();
    return null;
  }),
);


/**
 * Logout
 */
export const refreshJob = () => fromPromise(request
  .post(API_URL + '/api/job/start')
  .set('Authorization', 'Bearer ' + localStorage.token)
);

