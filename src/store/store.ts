import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger';

import { rootReducer } from './rootReducer';
import { rootSaga } from './saga';


const sagaMiddleware = createSagaMiddleware();

const middlewares = process.env.NODE_ENV === 'development'
  ? [sagaMiddleware, logger]
  : [sagaMiddleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), ...middlewares]
})

sagaMiddleware.run(rootSaga);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}
