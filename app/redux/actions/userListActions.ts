import axios from "axios";
import {
  FETCH_USER_LIST_REQUEST,
  FETCH_USER_LIST_SUCCESS,
  FETCH_USER_LIST_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
} from "../constants/userListConstants";
import { Toast } from "primereact/toast";
import { User } from "@/types/interface";
import { Dispatch } from "redux";

const getAuthToken = () => {
  return localStorage.getItem("api_token") || ""; // Get the token or return an empty string if not found
};

// Fetch User List
export const _fetchUserList = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_USER_LIST_REQUEST });
  try {
    const token = getAuthToken();
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: FETCH_USER_LIST_SUCCESS,
      payload: response.data.data.users,
    });

  } catch (error: any) {
    dispatch({
      type: FETCH_USER_LIST_FAIL,
      payload: error.message,
    });

  }
};

// Add User
export const _addUser = (newUserData: User, toast: React.RefObject<Toast>) => async (dispatch: Dispatch) => {
  dispatch({ type: ADD_USER_REQUEST });
  try {

    const token = getAuthToken();
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, newUserData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const newData = { ...newUserData, id: response.data.data.user.id };
    dispatch({
      type: ADD_USER_SUCCESS,
      payload: newData,
    });
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "User added successfully",
      life: 3000,
    });
  } catch (error: any) {
    dispatch({
      type: ADD_USER_FAIL,
      payload: error.message,
    });
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: "Failed to add user",
      life: 3000,
    });
  }
};

// Edit User
export const _editUser = (userId: number, updatedUserData: User, toast: React.RefObject<Toast>) => async (dispatch: Dispatch) => {
  dispatch({ type: EDIT_USER_REQUEST });
  try {

    const token = getAuthToken();
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`, updatedUserData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const newData = { ...updatedUserData, id: response.data.data.user.id };
    dispatch({
      type: EDIT_USER_SUCCESS,
      payload: newData,
    });
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "User updated successfully",
      life: 3000,
    });
  } catch (error: any) {
    dispatch({
      type: EDIT_USER_FAIL,
      payload: error.message,
    });
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: "Failed to update user",
      life: 3000,
    });
  }
};

// Delete User
export const _deleteUser = (userId: number, toast: React.RefObject<Toast>) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });
  try {
    const token = getAuthToken();
    await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: userId,
    });
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "User deleted successfully",
      life: 3000,
    });
  } catch (error: any) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.message,
    });
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: "Failed to delete user",
      life: 3000,
    });
  }
};
