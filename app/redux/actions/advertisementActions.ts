import { Dispatch } from 'redux';
import axios from 'axios';

import {
    FETCH_ADVERTISEMENTS_REQUEST,
    FETCH_ADVERTISEMENTS_SUCCESS,
    FETCH_ADVERTISEMENTS_FAIL,
    ADD_ADVERTISEMENT_REQUEST,
    ADD_ADVERTISEMENT_SUCCESS,
    ADD_ADVERTISEMENT_FAIL,
    EDIT_ADVERTISEMENT_REQUEST,
    EDIT_ADVERTISEMENT_SUCCESS,
    EDIT_ADVERTISEMENT_FAIL,
    DELETE_ADVERTISEMENT_REQUEST,
    DELETE_ADVERTISEMENT_SUCCESS,
    DELETE_ADVERTISEMENT_FAIL,
} from '../constants/advertisementConstants';

// Get Auth Token from Local Storage
const getAuthToken = () => {
    return localStorage.getItem('api_token') || ''; // Get the token or return an empty string if not found
};

// Fetch advertisements
export const _fetchAdvertisements = () => async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_ADVERTISEMENTS_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/advertisements`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({ type: FETCH_ADVERTISEMENTS_SUCCESS, payload: response.data.data.advertisements });
    } catch (error: any) {
        dispatch({ type: FETCH_ADVERTISEMENTS_FAIL, payload: error.message });
    }
};

// Add an advertisement
export const _addAdvertisement = (advertisementData: any) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_ADVERTISEMENT_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/advertisements`,
            advertisementData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        dispatch({ type: ADD_ADVERTISEMENT_SUCCESS, payload: response.data.data });
    } catch (error: any) {
        dispatch({ type: ADD_ADVERTISEMENT_FAIL, payload: error.message });
    }
};

// Edit an advertisement
export const _editAdvertisement = (advertisementId: number, advertisementData: any) => async (dispatch: Dispatch) => {
    dispatch({ type: EDIT_ADVERTISEMENT_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_BASE_URL}/advertisements/${advertisementId}`,
            advertisementData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        dispatch({ type: EDIT_ADVERTISEMENT_SUCCESS, payload: response.data.data });
    } catch (error: any) {
        dispatch({ type: EDIT_ADVERTISEMENT_FAIL, payload: error.message });
    }
};

// Delete an advertisement
export const _deleteAdvertisement = (advertisementId: number) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_ADVERTISEMENT_REQUEST });

    try {
        const token = getAuthToken();
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/advertisements/${advertisementId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({ type: DELETE_ADVERTISEMENT_SUCCESS, payload: advertisementId });
    } catch (error: any) {
        dispatch({ type: DELETE_ADVERTISEMENT_FAIL, payload: error.message });
    }
};
