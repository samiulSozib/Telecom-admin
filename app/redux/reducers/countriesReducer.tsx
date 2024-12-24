// store/countryReducer.ts
import {
    FETCH_COUNTRIES_REQUEST,
    FETCH_COUNTRIES_SUCCESS,
    FETCH_COUNTRIES_FAIL
} from '../constants/countriesConstants'

interface Country {
    id: number;
    country_name: string;
    country_flag_image_url: string | null;
    language_id: number | null;
    country_telecom_code: string;
    phone_number_length: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    currency: string | null;
    language: {
        id: number;
        language_name: string;
        language_code: string;
        direction: 'rtl' | 'ltr';
        deleted_at: string | null;
        created_at: string;
        updated_at: string;
    } | null;
}

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
