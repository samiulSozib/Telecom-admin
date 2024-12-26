import {
    FETCH_COMPANY_CODE_LIST_REQUEST,
    FETCH_COMPANY_CODE_LIST_SUCCESS,
    FETCH_COMPANY_CODE_LIST_FAIL,
    DELETE_COMPANY_CODE_REQUEST,
    DELETE_COMPANY_CODE_SUCCESS,
    DELETE_COMPANY_CODE_FAIL,
    ADD_COMPANY_CODE_REQUEST,
    ADD_COMPANY_CODE_SUCCESS,
    ADD_COMPANY_CODE_FAIL,
    EDIT_COMPANY_CODE_REQUEST,
    EDIT_COMPANY_CODE_SUCCESS,
    EDIT_COMPANY_CODE_FAIL,
} from '../constants/companyCodeConstants';

interface Company {
    id: number;
    company_name: string;
    company_logo: string;
    country_id: number;
    telegram_chat_id: number | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    country: Country | null;
}

interface Country {
    id: number;
    country_name: string;
    country_flag_image_url: string;
    language_id: number;
    country_telecom_code: string;
    phone_number_length: string;
}

export interface CompanyCode {
    id: number;
    company_id: number;
    reserved_digit: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    company: Company | null;
}

interface CompanyCodeState {
    loading: boolean;
    companyCodes: CompanyCode[];
    error: string | null;
}

const initialState: CompanyCodeState = {
    loading: false,
    companyCodes: [],
    error: null,
};

export const companyCodeReducer = (state = initialState, action: any): CompanyCodeState => {
    switch (action.type) {
        case FETCH_COMPANY_CODE_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_COMPANY_CODE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                companyCodes: action.payload,
                error: null,
            };
        case FETCH_COMPANY_CODE_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case ADD_COMPANY_CODE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_COMPANY_CODE_SUCCESS:
            return {
                ...state,
                loading: false,
                companyCodes: [...state.companyCodes, action.payload],
            };
        case ADD_COMPANY_CODE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case DELETE_COMPANY_CODE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_COMPANY_CODE_SUCCESS:
            return {
                ...state,
                loading: false,
                companyCodes: state.companyCodes.filter(code => code.id !== action.payload),
            };
        case DELETE_COMPANY_CODE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case EDIT_COMPANY_CODE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case EDIT_COMPANY_CODE_SUCCESS:
            return {
                ...state,
                loading: false,
                companyCodes: state.companyCodes.map((code) =>
                    code.id === action.payload.id ? action.payload : code
                ),
            };
        case EDIT_COMPANY_CODE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
