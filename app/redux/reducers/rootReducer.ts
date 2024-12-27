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
    currenciesReducer:currenciesReducer,
    authReducer:authReducer,
    dashboardDataReducer:dashboardDataReducer,
    countriesReducer:countriesReducer,
    telegramReducer:telegramReducer,
    companyReducer:companyReducer,
    companyCodeReducer:companyCodeReducer,
    serviceCategoryReducer:serviceCategoryReducer,
    serviceReducer:serviceReducer,
    bundleReducer:bundleReducer
})



// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer
