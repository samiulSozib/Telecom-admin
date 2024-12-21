import {combineReducers} from 'redux'
import { currenciesReducer } from './currenciesReducer';

const rootReducer=combineReducers({
    currenciesReducer:currenciesReducer
})



export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer
