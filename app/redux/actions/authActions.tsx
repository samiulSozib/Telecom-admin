import { Dispatch } from "redux";
import axios from "axios";

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../constants/authConstants'

export const _login = (username: string, password: string) => async (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, { username, password });

        localStorage.setItem('api_token', response.data.data.api_token);
        localStorage.setItem('user_info', JSON.stringify(response.data.data.user_info));
        dispatch({ type: LOGIN_SUCCESS, payload: response.data.data });
        return { success: true }; // Explicitly indicate success
    } catch (error: any) {
        dispatch({ type: LOGIN_FAIL, payload: error.response?.data?.message || error.message });
        return { success: false, error: error.response?.data?.message || error.message }; // Return failure
    }
};
