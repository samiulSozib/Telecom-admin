import { Dispatch } from "redux";
import axios from "axios";

import {
    FETCH_CURRENCIES_REQUEST,
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_FAILURE,
    ADD_CURRENCY_REQUEST,
    ADD_CURRENCY_SUCCESS,
    ADD_CURRENCY_FAIL,
    EDIT_CURRENCY_REQUEST,
    EDIT_CURRENCY_SUCCESS,
    EDIT_CURRENCY_FAIL,
    DELETE_CURRENCY_REQUEST,
    DELETE_CURRENCY_SUCCESS,
    DELETE_CURRENCY_FAIL,
} from "../constants/currenciesConstants";

const getAuthToken = () => {
    return localStorage.getItem("api_token") || ""; // Get the token or return an empty string if not found
};

// Fetch currencies
export const _fetchCurrencies = () => async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_CURRENCIES_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/currencies`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({ type: FETCH_CURRENCIES_SUCCESS, payload: response.data.data.currencies });
    } catch (error: any) {
        dispatch({ type: FETCH_CURRENCIES_FAILURE, payload: error.message });
    }
};

// Add a currency
export const _addCurrency = (currencyData: any) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_CURRENCY_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/currencies`,
            currencyData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        dispatch({ type: ADD_CURRENCY_SUCCESS, payload: response.data.data });
    } catch (error: any) {
        dispatch({ type: ADD_CURRENCY_FAIL, payload: error.message });
    }
};

// Edit a currency
export const _editCurrency = (currencyId: number, currencyData: any) => async (dispatch: Dispatch) => {
    dispatch({ type: EDIT_CURRENCY_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_BASE_URL}/currencies/${currencyId}`,
            currencyData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        dispatch({ type: EDIT_CURRENCY_SUCCESS, payload: response.data.data });
    } catch (error: any) {
        dispatch({ type: EDIT_CURRENCY_FAIL, payload: error.message });
    }
};

// Delete a currency
export const _deleteCurrency = (currencyId: number) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_CURRENCY_REQUEST });

    try {
        const token = getAuthToken();
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/currencies/${currencyId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({ type: DELETE_CURRENCY_SUCCESS, payload: currencyId });
    } catch (error: any) {
        dispatch({ type: DELETE_CURRENCY_FAIL, payload: error.message });
    }
};
