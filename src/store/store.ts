import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

import { IState, rootReducer } from './rootReducer';


export const store = configureStore({
  reducer: rootReducer
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppThunk = ThunkAction<void, IState, unknown, Action<string>>

export type AppThunkDispatch = ThunkDispatch<IState, unknown, Action<string>>
