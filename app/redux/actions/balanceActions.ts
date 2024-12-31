import { Dispatch } from "redux";
import axios from "axios";
import {
    FETCH_BALANCES_REQUEST,
    FETCH_BALANCES_SUCCESS,
    FETCH_BALANCES_FAIL,
    ADD_BALANCE_REQUEST,
    ADD_BALANCE_SUCCESS,
    ADD_BALANCE_FAIL,
    EDIT_BALANCE_REQUEST,
    EDIT_BALANCE_SUCCESS,
    EDIT_BALANCE_FAIL,
    DELETE_BALANCE_REQUEST,
    DELETE_BALANCE_SUCCESS,
    DELETE_BALANCE_FAIL,
} from '../constants/balanceConstants';

const getAuthToken = () => {
    return localStorage.getItem("api_token") || ""; // Retrieve the token from localStorage
};

// Fetch balances
export const _fetchBalances = () => async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_BALANCES_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/balances`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({ type: FETCH_BALANCES_SUCCESS, payload: response.data.data.balances });
    } catch (error: any) {
        dispatch({ type: FETCH_BALANCES_FAIL, payload: error.message });
    }
};

// Add a balance
export const _addBalance = (balanceData: any) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_BALANCE_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/balances`, balanceData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({ type: ADD_BALANCE_SUCCESS, payload: response.data.data });
    } catch (error: any) {
        dispatch({ type: ADD_BALANCE_FAIL, payload: error.message });
    }
};

// Edit a balance
export const _editBalance = (balanceId: number, balanceData: any) => async (dispatch: Dispatch) => {
    dispatch({ type: EDIT_BALANCE_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_BASE_URL}/balances/${balanceId}`,
            balanceData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        dispatch({ type: EDIT_BALANCE_SUCCESS, payload: response.data.data });
    } catch (error: any) {
        dispatch({ type: EDIT_BALANCE_FAIL, payload: error.message });
    }
};

// Delete a balance
export const _deleteBalance = (balanceId: number) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_BALANCE_REQUEST });

    try {
        const token = getAuthToken();
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/balances/${balanceId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({ type: DELETE_BALANCE_SUCCESS, payload: balanceId });
    } catch (error: any) {
        dispatch({ type: DELETE_BALANCE_FAIL, payload: error.message });
    }
};
