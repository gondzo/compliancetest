import {
  LocationChangeAction,
  RouterAction,
  RouterState,
} from 'react-router-redux';
import { getReturnOfExpression } from 'react-redux-typescript';
import { Epic } from 'redux-observable';
import * as globalActions from '@src/modules/global/actions';
import * as reportsActions from '@src/modules/reports/actions';

export interface RuleResultItem {
  name: string;
  ownerEmail?: string;
}

export interface RuleResult {
  name: string;
  friendlyName: string;
  items: RuleResultItem[];
}

export interface JobResult {
  started: string;
  duration: number;
  result: 'success' | 'error';
  message?: string;
  rules: RuleResult[];
}

export interface User {
  token: string;
  email: string;
  isAdmin: boolean;
}

export interface GlobalState {
  user?: User;
  error?: string;
  isLoading: boolean;
}

export interface ReportsState {
  result?: JobResult;
  error?: string;
  isRefreshing: boolean;
}

export interface State {
  global: GlobalState;
  reports: ReportsState;
  router: RouterState;
}

export const allActions = [
  ...Object.values(globalActions),
  ...Object.values(reportsActions),
];

const returnOfActions = allActions.map(getReturnOfExpression);

type AppAction = typeof returnOfActions[number];
type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction = AppAction | ReactRouterAction;

export type RootEpic = Epic<RootAction, State>;
