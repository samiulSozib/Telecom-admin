import {
    FETCH_COMPANY_LIST_REQUEST,
    FETCH_COMPANY_LIST_SUCCESS,
    FETCH_COMPANY_LIST_FAIL,
    DELETE_COMPANY_REQUEST,
    DELETE_COMPANY_SUCCESS,
    DELETE_COMPANY_FAIL,
    ADD_COMPANY_REQUEST,
    ADD_COMPANY_SUCCESS,
    ADD_COMPANY_FAIL,
    EDIT_COMPANY_REQUEST,
    EDIT_COMPANY_SUCCESS,
    EDIT_COMPANY_FAIL
} from '../constants/companyConstants';


interface Country {
    id: number;
    country_name: string;
    country_flag_image_url: string;
    language_id: number;
    country_telecom_code: string;
    phone_number_length: string;
}

interface Telegram_Chat_Id{
    id:number,
    chat_id:number,
    group_name:string,
    created_at:string,
    updated_at:string
}

export interface Company {
    id: number;
    company_name: string;
    company_logo: File |string;
    country_id: number;
    telegram_chat_id: Telegram_Chat_Id | null ;
    _telegram_chat_id:number|null,
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    country: Country | null;
}

interface CompanyState {
    loading: boolean;
    companies: Company[];
    error: string | null;
}

const initialState: CompanyState = {
    loading: false,
    companies: [],
    error: null,
};

export const companyReducer = (state = initialState, action: any): CompanyState => {
    switch (action.type) {
        case FETCH_COMPANY_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_COMPANY_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                companies: action.payload,
                error: null,
            };
        case FETCH_COMPANY_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case DELETE_COMPANY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_COMPANY_SUCCESS:
            return {
                ...state,
                loading: false,
                companies: state.companies.filter(company => company.id !== action.payload),
            };
        case DELETE_COMPANY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_COMPANY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_COMPANY_SUCCESS:
            return {
                ...state,
                loading: false,
                companies: [...state.companies, action.payload],
            };
        case ADD_COMPANY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case EDIT_COMPANY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case EDIT_COMPANY_SUCCESS:
            return {
                ...state,
                loading: false,
                companies: state.companies.map((company) =>
                    company.id === action.payload.id ? action.payload : company
                ),
            };
        case EDIT_COMPANY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
