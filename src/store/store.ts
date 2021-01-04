import { createStore, applyMiddleware, compose, Action } from 'redux';
import logger from 'redux-logger';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { IState, rootReducer } from './reducers';

let composeEnhancers = null;

// in development mode only and if redux devtools are installed
if (
  process.env.NODE_ENV === 'development' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
} else {
  composeEnhancers = compose;
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger)),
);

export type AppThunkAction<ActionType extends Action, ReturnType = void> = ThunkAction<
  ReturnType,
  IState,
  unknown,
  ActionType
>

export type AppThunkDispatch<ActionType extends Action> = ThunkDispatch<
  IState,
  unknown,
  ActionType
  >


