// import { compose, createStore, applyMiddleware } from 'redux';
import {configureStore} from '@reduxjs/toolkit'
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
  Boolean
);

// const composeEnhancer =
//   (process.env.NODE_ENV !== 'production' &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist: ['user'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// redux toolkit comes with 3 middleware such as Thunk, serializableCheck and immutable they can also be removed and add middlewares of our own.
export const store = configureStore({
  reducer: rootReducer,
 middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck:false,
    }).concat(middleWares),
});


// export const persistor = persistStore(store);
