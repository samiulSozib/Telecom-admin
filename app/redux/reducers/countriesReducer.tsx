// store/countryReducer.ts
import { Country } from '@/types/interface';
import {
    FETCH_COUNTRIES_REQUEST,
    FETCH_COUNTRIES_SUCCESS,
    FETCH_COUNTRIES_FAIL
} from '../constants/countriesConstants'



interface CountryState {
    loading: boolean;
    countries: Country[];
    error: string | null;
}

const initialState: CountryState = {
    loading: false,
    countries: [],
    error: null,
};

export const countriesReducer = (state = initialState, action: any): CountryState => {
    switch (action.type) {
        case FETCH_COUNTRIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_COUNTRIES_SUCCESS:
            return {
                ...state,
                loading: false,
                countries: action.payload,
                error: null,
            };
        case FETCH_COUNTRIES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
