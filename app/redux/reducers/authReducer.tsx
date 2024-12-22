import { AnyAction } from "redux";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../constants/authConstants";

export interface Admin {
    id: number;
    user_id: number;
    name: string;
    email: string;
    phone: string;
    user_type: string;
    email_verified_at: string | null;
    profile_image_url: string;
    status: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

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

export interface UserInfo {
    id: number;
    uuid: string;
    name: string;
    email: string;
    phone: string;
    user_type: string;
    email_verified_at: string | null;
    currency_preference_code: string;
    currency_preference_id: number;
    fcm_token: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    admin: Admin | null;
    currency: Currency | null;
}

export interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    api_token: string | null;
    userInfo: UserInfo | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    api_token: null,
    userInfo: null,
};

export const authReducer = (state = initialState, action: AnyAction): AuthState => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                api_token: action.payload.api_token,
                userInfo: action.payload.user_info,
                error: null,
            };

        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: action.payload,
            };

        case LOGOUT:
            return {
                ...initialState,
            };

        default:
            return state;
    }
};
