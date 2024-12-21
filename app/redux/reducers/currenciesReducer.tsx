import { AnyAction } from "redux";
import {
    FETCH_CURRENCIES_REQUEST,
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_FAILURE
} from '../constants/currenciesConstants';

export interface Currency {
    id: number;
    name: string;
    code: string;
    symbol: string;
    ignore_digits_count: string | null;
    exchange_rate_per_usd: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

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
