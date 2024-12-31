// store/actions/languageActions.ts
import { Dispatch } from "redux";
import axios from "axios";

import {
  FETCH_LANGUAGES_REQUEST,
  FETCH_LANGUAGES_SUCCESS,
  FETCH_LANGUAGES_FAIL,
  ADD_LANGUAGE_REQUEST,
  ADD_LANGUAGE_SUCCESS,
  ADD_LANGUAGE_FAIL,
  EDIT_LANGUAGE_REQUEST,
  EDIT_LANGUAGE_SUCCESS,
  EDIT_LANGUAGE_FAIL,
  DELETE_LANGUAGE_REQUEST,
  DELETE_LANGUAGE_SUCCESS,
  DELETE_LANGUAGE_FAIL,
} from "../constants/languageConstants";

const getAuthToken = () => {
  return localStorage.getItem("api_token") || ""; // Retrieve the token from localStorage
};

// Fetch languages
export const _fetchLanguages = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_LANGUAGES_REQUEST });

  try {
    const token = getAuthToken();
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/languages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: FETCH_LANGUAGES_SUCCESS, payload: response.data.data.languages });
  } catch (error: any) {
    dispatch({ type: FETCH_LANGUAGES_FAIL, payload: error.message });
  }
};

// Add a language
export const _addLanguage = (languageData: any) => async (dispatch: Dispatch) => {
  dispatch({ type: ADD_LANGUAGE_REQUEST });

  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/languages`,
      languageData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: ADD_LANGUAGE_SUCCESS, payload: response.data.data });
  } catch (error: any) {
    dispatch({ type: ADD_LANGUAGE_FAIL, payload: error.message });
  }
};

// Edit a language
export const _editLanguage = (languageId: number, languageData: any) => async (dispatch: Dispatch) => {
  dispatch({ type: EDIT_LANGUAGE_REQUEST });

  try {
    const token = getAuthToken();
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/languages/${languageId}`,
      languageData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: EDIT_LANGUAGE_SUCCESS, payload: response.data.data });
  } catch (error: any) {
    dispatch({ type: EDIT_LANGUAGE_FAIL, payload: error.message });
  }
};

// Delete a language
export const _deleteLanguage = (languageId: number) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_LANGUAGE_REQUEST });

  try {
    const token = getAuthToken();
    await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/languages/${languageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: DELETE_LANGUAGE_SUCCESS, payload: languageId });
  } catch (error: any) {
    dispatch({ type: DELETE_LANGUAGE_FAIL, payload: error.message });
  }
};
