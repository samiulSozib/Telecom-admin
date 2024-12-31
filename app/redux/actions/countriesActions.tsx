import { Dispatch } from "redux";
import axios from "axios";

import {
    FETCH_COUNTRIES_REQUEST,
    FETCH_COUNTRIES_SUCCESS,
    FETCH_COUNTRIES_FAIL,
    ADD_COUNTRY_REQUEST,
    ADD_COUNTRY_SUCCESS,
    ADD_COUNTRY_FAIL,
    EDIT_COUNTRY_REQUEST,
    EDIT_COUNTRY_SUCCESS,
    EDIT_COUNTRY_FAIL,
    DELETE_COUNTRY_REQUEST,
    DELETE_COUNTRY_SUCCESS,
    DELETE_COUNTRY_FAIL,
} from '../constants/countriesConstants';

const getAuthToken = () => {
    return localStorage.getItem("api_token") || ""; // Get the token or return an empty string if not found
};

// Fetch Countries
export const _fetchCountries = () => async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_COUNTRIES_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/countries`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: FETCH_COUNTRIES_SUCCESS,
            payload: response.data.data.countries,
        });
    } catch (error: any) {
        dispatch({
            type: FETCH_COUNTRIES_FAIL,
            payload: error.message,
        });
    }
};

// Add Country
export const _addCountry = (countryData: any) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_COUNTRY_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/countries`, countryData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: ADD_COUNTRY_SUCCESS,
            payload: response.data.data,
        });
    } catch (error: any) {
        dispatch({
            type: ADD_COUNTRY_FAIL,
            payload: error.message,
        });
    }
};

// Edit Country
export const _editCountry = (countryId: number, updatedData: any) => async (dispatch: Dispatch) => {
    dispatch({ type: EDIT_COUNTRY_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/countries/${countryId}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: EDIT_COUNTRY_SUCCESS,
            payload: response.data.data,
        });
    } catch (error: any) {
        dispatch({
            type: EDIT_COUNTRY_FAIL,
            payload: error.message,
        });
    }
};

// Delete Country
export const _deleteCountry = (countryId: number) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_COUNTRY_REQUEST });

    try {
        const token = getAuthToken();
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/countries/${countryId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: DELETE_COUNTRY_SUCCESS,
            payload: countryId,
        });
    } catch (error: any) {
        dispatch({
            type: DELETE_COUNTRY_FAIL,
            payload: error.message,
        });
    }
};
