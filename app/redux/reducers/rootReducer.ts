import {combineReducers} from 'redux'
import { currenciesReducer } from './currenciesReducer';
import { authReducer } from './authReducer';
import { dashboardDataReducer } from './dashboardReducer';
import { countriesReducer } from './countriesReducer';
import { telegramReducer } from './telegramReducer';
import { companyReducer } from './companyReducer';

const rootReducer=combineReducers({
    currenciesReducer,
    authReducer,
    dashboardDataReducer,
    countriesReducer,
    telegramReducer,
    companyReducer
})



export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer
