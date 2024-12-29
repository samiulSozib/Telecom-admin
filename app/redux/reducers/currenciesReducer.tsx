import { AnyAction } from "redux";
import {
    FETCH_CURRENCIES_REQUEST,
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_FAILURE
} from '../constants/currenciesConstants';
import { Currency } from "@/types/interface";



export interface CurrencyState {
    currencies: Currency[];
    loading: boolean;
    error: string | null;
}

const initialState: CurrencyState = {
    currencies: [],
    loading: false,
    error: null
};

export const currenciesReducer = (state = initialState, action: AnyAction): CurrencyState => {
    switch (action.type) {
        case FETCH_CURRENCIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_CURRENCIES_SUCCESS:
            return {
                ...state,
                loading: false,
                currencies: action.payload,
                error: null
            };

        case FETCH_CURRENCIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};
