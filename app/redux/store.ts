import { thunk } from 'redux-thunk';
// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import { applyMiddleware } from 'redux';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
