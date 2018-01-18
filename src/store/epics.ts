import * as global from '@src/modules/global/epic';
import * as reports from '@src/modules/reports/epic';
import { combineEpics } from 'redux-observable';
import {RootEpic} from '@src/types';
import 'rxjs/add/operator/catch';

const wrapEpic = (epic: RootEpic) => (action$: any, store: any, deps: any) =>
  epic(action$, store, deps).catch((error, source) => {
    console.error(error);
    setTimeout(() => {
      throw error;
    }, 0);
    return source;
  });

export default combineEpics(
  ...[
    ...Object.values(global),
    ...Object.values(reports),
  ].map(wrapEpic),
);
