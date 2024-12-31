// store/resellerReducer.ts
import {
    FETCH_RESELLERS_REQUEST,
    FETCH_RESELLERS_SUCCESS,
    FETCH_RESELLERS_FAIL,
    ADD_RESELLER_REQUEST,
    ADD_RESELLER_SUCCESS,
    ADD_RESELLER_FAIL,
    EDIT_RESELLER_REQUEST,
    EDIT_RESELLER_SUCCESS,
    EDIT_RESELLER_FAIL,
    DELETE_RESELLER_REQUEST,
    DELETE_RESELLER_SUCCESS,
    DELETE_RESELLER_FAIL,
} from "../constants/resellerConstants";
import { Reseller } from "@/types/interface";

interface ResellerState {
    loading: boolean;
    resellers: Reseller[];
    error: string | null;
}

const initialState: ResellerState = {
    loading: false,
    resellers: [],
    error: null,
};

export const resellerReducer = (state = initialState, action: any): ResellerState => {
    switch (action.type) {
        case FETCH_RESELLERS_REQUEST:
        case ADD_RESELLER_REQUEST:
        case EDIT_RESELLER_REQUEST:
        case DELETE_RESELLER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_RESELLERS_SUCCESS:
            return {
                ...state,
                loading: false,
                resellers: action.payload,
                error: null,
            };

        case FETCH_RESELLERS_FAIL:
        case ADD_RESELLER_FAIL:
        case EDIT_RESELLER_FAIL:
        case DELETE_RESELLER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case ADD_RESELLER_SUCCESS:
            return {
                ...state,
                loading: false,
                resellers: [...state.resellers, action.payload],
                error: null,
            };

        case EDIT_RESELLER_SUCCESS:
            return {
                ...state,
                loading: false,
                resellers: state.resellers.map((reseller) =>
                    reseller.id === action.payload.id ? action.payload : reseller
                ),
                error: null,
            };

        case DELETE_RESELLER_SUCCESS:
            return {
                ...state,
                loading: false,
                resellers: state.resellers.filter((reseller) => reseller.id !== action.payload),
                error: null,
            };

        default:
            return state;
    }
};
