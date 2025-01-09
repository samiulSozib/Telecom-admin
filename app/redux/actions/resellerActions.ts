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
import { Toast } from "primereact/toast";
import { Reseller } from "@/types/interface";

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
export const _addReseller = (resellerData: Reseller,toast: React.RefObject<Toast>) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_RESELLER_REQUEST });

    try {
        const token = getAuthToken();
        const formData = new FormData();

        formData.append('reseller_name', resellerData.reseller_name);
        formData.append('contact_name', resellerData.contact_name);
        formData.append('email', resellerData.email);
        formData.append('phone', resellerData.phone);
        formData.append('account_password', resellerData.account_password);
        formData.append('country_id', String(resellerData.country?.id));
        formData.append('province_id', String(resellerData.province?.id));
        formData.append('districts_id', String(resellerData.district?.id));
        formData.append('currency_preference_id', resellerData.code);

        if (resellerData.profile_image_url && typeof resellerData.profile_image_url !== 'string') {
            formData.append('profile_image_url', resellerData.profile_image_url);
        }


        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/resellers`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        const newData={...resellerData,id:response.data.data.reseller.id}
        dispatch({ type: ADD_RESELLER_SUCCESS, payload: newData });
        toast.current?.show({
            severity: "success",
            summary: "Successful",
            detail: "Reseller added",
            life: 3000,
          });
    } catch (error: any) {
        console.log(error)
        dispatch({ type: ADD_RESELLER_FAIL, payload: error.message });
        toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: "Reseller added fail",
            life: 3000,
          });
    }
};

// Edit Reseller
export const _editReseller = (id: number, resellerData: Reseller,toast: React.RefObject<Toast>) => async (dispatch: Dispatch) => {
    dispatch({ type: EDIT_RESELLER_REQUEST });

    try {
        const token = getAuthToken();
        const formData = new FormData();

        formData.append('reseller_name', resellerData.reseller_name);
        formData.append('contact_name', resellerData.contact_name);
        formData.append('email', resellerData.email);
        formData.append('phone', resellerData.phone);
        formData.append('account_password', resellerData.account_password);
        formData.append('country_id', String(resellerData.country?.id));
        formData.append('province_id', String(resellerData.province?.id));
        formData.append('districts_id', String(resellerData.district?.id));
        formData.append('currency_preference_id', resellerData.code);

        if (resellerData.profile_image_url && typeof resellerData.profile_image_url !== 'string') {
            formData.append('profile_image_url', resellerData.profile_image_url);
        }
        console.log(resellerData)
        //return
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/resellers/${id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        const newData={...resellerData,id:response.data.data.reseller.id}
        dispatch({ type: EDIT_RESELLER_SUCCESS, payload: newData});
        toast.current?.show({
            severity: "success",
            summary: "Successful",
            detail: "Reseller edited",
            life: 3000,
          });
    } catch (error: any) {
        dispatch({ type: EDIT_RESELLER_FAIL, payload: error.message });
        console.log(error)
        toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: "Reseller edited fail",
            life: 3000,
          });
    }
};

// Delete Reseller
export const _deleteReseller = (id: number,toast: React.RefObject<Toast>) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_RESELLER_REQUEST });

    try {
        const token = getAuthToken();
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/resellers/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: DELETE_RESELLER_SUCCESS, payload: id });
        toast.current?.show({
            severity: "success",
            summary: "Successful",
            detail: "Reseller deleted",
            life: 3000,
          });
    } catch (error: any) {
        dispatch({ type: DELETE_RESELLER_FAIL, payload: error.message });
        toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: "Reseller deleted fail",
            life: 3000,
          });
    }
};
