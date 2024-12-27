import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer, { RootState } from './reducers/rootReducer';

// Create the store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<RootState, any>)
);

export type AppDispatch = typeof store.dispatch;

export default store;
