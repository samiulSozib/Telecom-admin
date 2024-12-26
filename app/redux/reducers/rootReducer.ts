import {combineReducers} from 'redux'
import { currenciesReducer } from './currenciesReducer';
import { authReducer } from './authReducer';
import { dashboardDataReducer } from './dashboardReducer';
import { countriesReducer } from './countriesReducer';
import { telegramReducer } from './telegramReducer';
import { companyReducer } from './companyReducer';
import { companyCodeReducer } from './companyCodeReducer';
import serviceCategoryReducer from './serviceCategoryReducer';
import serviceReducer from './serviceReducer';
import bundleReducer from './bundleReducer';

const rootReducer=combineReducers({
    currenciesReducer,
    authReducer,
    dashboardDataReducer,
    countriesReducer,
    telegramReducer,
    companyReducer,
    companyCodeReducer,
    serviceCategoryReducer,
    serviceReducer,
    bundleReducer
})



export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer
