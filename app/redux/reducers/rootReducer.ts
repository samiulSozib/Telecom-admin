import {combineReducers} from 'redux'
import { currenciesReducer } from './currenciesReducer';
import { authReducer } from './authReducer';
import { dashboardDataReducer } from './dashboardReducer';

const rootReducer=combineReducers({
    currenciesReducer,
    authReducer,
    dashboardDataReducer
})



export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer
