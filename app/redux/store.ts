import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import  {RootState}  from './reducers/rootReducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<RootState,any>)
);

export type AppDispatch = typeof store.dispatch;

export default store;
