// store/actions/districtActions.ts
import axios from "axios";
import { Dispatch } from "redux";
import {
    FETCH_DISTRICTS_REQUEST,
    FETCH_DISTRICTS_SUCCESS,
    FETCH_DISTRICTS_FAIL,
    ADD_DISTRICT_REQUEST,
    ADD_DISTRICT_SUCCESS,
    ADD_DISTRICT_FAIL,
    EDIT_DISTRICT_REQUEST,
    EDIT_DISTRICT_SUCCESS,
    EDIT_DISTRICT_FAIL,
    DELETE_DISTRICT_REQUEST,
    DELETE_DISTRICT_SUCCESS,
    DELETE_DISTRICT_FAIL,
} from "../constants/districtsConstants";
import { District } from "@/types/interface";

const getAuthToken = () => {
    return localStorage.getItem("api_token") || "";
};

// Fetch Districts
export const _fetchDistricts = () => async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_DISTRICTS_REQUEST });
    try {
        const token = getAuthToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/districts`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: FETCH_DISTRICTS_SUCCESS, payload: response.data.data.districts });
    } catch (error: any) {
        dispatch({ type: FETCH_DISTRICTS_FAIL, payload: error.message });
    }
};

// Add District
export const _addDistrict = (district: Partial<District>) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_DISTRICT_REQUEST });
    try {
        const token = getAuthToken();
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/districts`,
            district,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        dispatch({ type: ADD_DISTRICT_SUCCESS, payload: response.data.data });
    } catch (error: any) {
        dispatch({ type: ADD_DISTRICT_FAIL, payload: error.message });
    }
};

// Edit District
export const _editDistrict = (id: number, updatedData: Partial<District>) => async (dispatch: Dispatch) => {
    dispatch({ type: EDIT_DISTRICT_REQUEST });
    try {
        const token = getAuthToken();
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_BASE_URL}/districts/${id}`,
            updatedData,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        dispatch({ type: EDIT_DISTRICT_SUCCESS, payload: response.data.data });
    } catch (error: any) {
        dispatch({ type: EDIT_DISTRICT_FAIL, payload: error.message });
    }
};

// Delete District
export const _deleteDistrict = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_DISTRICT_REQUEST });
    try {
        const token = getAuthToken();
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/districts/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: DELETE_DISTRICT_SUCCESS, payload: id });
    } catch (error: any) {
        dispatch({ type: DELETE_DISTRICT_FAIL, payload: error.message });
    }
};
