import axios from "axios";
import { Dispatch } from "redux";

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

const getAuthToken = () => {
    return localStorage.getItem("api_token") || ""; // Fetch token from localStorage
};

// Fetch Resellers
export const _fetchResellers = () => async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_RESELLERS_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/resellers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: FETCH_RESELLERS_SUCCESS, payload: response.data.data.resellers });
    } catch (error: any) {
        dispatch({ type: FETCH_RESELLERS_FAIL, payload: error.message });
    }
};

// Add Reseller
export const _addReseller = (resellerData: any) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_RESELLER_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/resellers`,
            resellerData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: ADD_RESELLER_SUCCESS, payload: response.data.data.reseller });
    } catch (error: any) {
        dispatch({ type: ADD_RESELLER_FAIL, payload: error.message });
    }
};

// Edit Reseller
export const _editReseller = (id: string, resellerData: any) => async (dispatch: Dispatch) => {
    dispatch({ type: EDIT_RESELLER_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_BASE_URL}/resellers/${id}`,
            resellerData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: EDIT_RESELLER_SUCCESS, payload: response.data.data.reseller });
    } catch (error: any) {
        dispatch({ type: EDIT_RESELLER_FAIL, payload: error.message });
    }
};

// Delete Reseller
export const _deleteReseller = (id: string) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_RESELLER_REQUEST });

    try {
        const token = getAuthToken();
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/resellers/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: DELETE_RESELLER_SUCCESS, payload: id });
    } catch (error: any) {
        dispatch({ type: DELETE_RESELLER_FAIL, payload: error.message });
    }
};
