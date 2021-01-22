import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger';

import { IState, rootReducer } from './rootReducer';
import { postsSaga } from '../features/posts/postsSlice';


const sagaMiddleware = createSagaMiddleware();

const middlewares = process.env.NODE_ENV === 'development'
  ? [sagaMiddleware, logger]
  : [sagaMiddleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), ...middlewares]
})

sagaMiddleware.run(postsSaga);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppThunk = ThunkAction<void, IState, unknown, Action<string>>

export type AppThunkDispatch = ThunkDispatch<IState, unknown, Action<string>>
