// store/actions/provinceActions.ts
import { Dispatch } from 'redux';
import axios from 'axios';

import {
    FETCH_PROVINCES_REQUEST,
    FETCH_PROVINCES_SUCCESS,
    FETCH_PROVINCES_FAIL,
    ADD_PROVINCE_REQUEST,
    ADD_PROVINCE_SUCCESS,
    ADD_PROVINCE_FAIL,
    EDIT_PROVINCE_REQUEST,
    EDIT_PROVINCE_SUCCESS,
    EDIT_PROVINCE_FAIL,
    DELETE_PROVINCE_REQUEST,
    DELETE_PROVINCE_SUCCESS,
    DELETE_PROVINCE_FAIL,
} from '../constants/provinceConstants';

const getAuthToken = () => {
    return localStorage.getItem('api_token') || ''; // Retrieve the token from localStorage
};

// Fetch provinces
export const _fetchProvinces = () => async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_PROVINCES_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/provinces`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({ type: FETCH_PROVINCES_SUCCESS, payload: response.data.data.provinces });
    } catch (error: any) {
        dispatch({ type: FETCH_PROVINCES_FAIL, payload: error.message });
    }
};

// Add a province
export const _addProvince = (provinceData: any) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_PROVINCE_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/provinces`,
            provinceData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        dispatch({ type: ADD_PROVINCE_SUCCESS, payload: response.data.data });
    } catch (error: any) {
        dispatch({ type: ADD_PROVINCE_FAIL, payload: error.message });
    }
};

// Edit a province
export const _editProvince = (provinceId: number, provinceData: any) => async (dispatch: Dispatch) => {
    dispatch({ type: EDIT_PROVINCE_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_BASE_URL}/provinces/${provinceId}`,
            provinceData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        dispatch({ type: EDIT_PROVINCE_SUCCESS, payload: response.data.data });
    } catch (error: any) {
        dispatch({ type: EDIT_PROVINCE_FAIL, payload: error.message });
    }
};

// Delete a province
export const _deleteProvince = (provinceId: number) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_PROVINCE_REQUEST });

    try {
        const token = getAuthToken();
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/provinces/${provinceId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({ type: DELETE_PROVINCE_SUCCESS, payload: provinceId });
    } catch (error: any) {
        dispatch({ type: DELETE_PROVINCE_FAIL, payload: error.message });
    }
};
