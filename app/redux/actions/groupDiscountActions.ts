// store/actions/languageActions.ts
import { Dispatch } from "redux";
import axios from "axios";

import {
    FETCH_GROUP_DISCOUNTS_REQUEST,
    FETCH_GROUP_DISCOUNTS_SUCCESS,
    FETCH_GROUP_DISCOUNTS_FAIL,
    ADD_GROUP_DISCOUNT_REQUEST,
    ADD_GROUP_DISCOUNT_SUCCESS,
    ADD_GROUP_DISCOUNT_FAIL,
    EDIT_GROUP_DISCOUNT_REQUEST,
    EDIT_GROUP_DISCOUNT_SUCCESS,
    EDIT_GROUP_DISCOUNT_FAIL,
    DELETE_GROUP_DISCOUNT_REQUEST,
    DELETE_GROUP_DISCOUNT_SUCCESS,
    DELETE_GROUP_DISCOUNT_FAIL,
  } from "../constants/groupDiscountConstants";
import { GroupDiscount } from "@/types/interface";
import { Toast } from "primereact/toast";

const getAuthToken = () => {
  return localStorage.getItem("api_token") || ""; // Retrieve the token from localStorage
};

// Fetch languages
export const _fetchLanguages = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_GROUP_DISCOUNTS_REQUEST });

  try {
    const token = getAuthToken();
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/group-discounts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: FETCH_GROUP_DISCOUNTS_SUCCESS, payload: response.data.data.group_discounts });
  } catch (error: any) {
    dispatch({ type: FETCH_GROUP_DISCOUNTS_FAIL, payload: error.message });
  }
};

// Add a language
export const _addLanguage = (languageData: GroupDiscount,toast: React.RefObject<Toast>) => async (dispatch: Dispatch) => {
  dispatch({ type: ADD_GROUP_DISCOUNT_REQUEST });

  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/group-discounts`,
      languageData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: ADD_GROUP_DISCOUNT_SUCCESS, payload: response.data.data.language });
    toast.current?.show({
        severity: "success",
        summary: "Successful",
        detail: "Language added",
        life: 3000,
      });
  } catch (error: any) {
    dispatch({ type: ADD_GROUP_DISCOUNT_FAIL, payload: error.message });
    toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to add language",
        life: 3000,
      });
  }
};

// Edit a language
export const _editLanguage = (languageId: number, languageData: GroupDiscount,toast: React.RefObject<Toast>) => async (dispatch: Dispatch) => {
  dispatch({ type: EDIT_GROUP_DISCOUNT_REQUEST });

  try {
    const token = getAuthToken();
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/group-discounts/${languageId}`,
      languageData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: EDIT_GROUP_DISCOUNT_SUCCESS, payload: response.data.data.language });
    toast.current?.show({
        severity: "success",
        summary: "Successful",
        detail: "Language edited",
        life: 3000,
      });
  } catch (error: any) {
    dispatch({ type: EDIT_GROUP_DISCOUNT_FAIL, payload: error.message });
    toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to edit language",
        life: 3000,
      });
  }
};

// Delete a language
export const _deleteLanguage = (languageId: number,toast: React.RefObject<Toast>) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_GROUP_DISCOUNT_REQUEST });

  try {
    const token = getAuthToken();
    await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/group-discounts/${languageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: DELETE_GROUP_DISCOUNT_SUCCESS, payload: languageId });
    toast.current?.show({
        severity: "success",
        summary: "Successful",
        detail: "Language deleted",
        life: 3000,
      });
  } catch (error: any) {
    dispatch({ type: DELETE_GROUP_DISCOUNT_FAIL, payload: error.message });
    toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to delete language",
        life: 3000,
      });
  }
};
