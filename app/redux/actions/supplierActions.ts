import { Dispatch } from 'redux';
import axios from 'axios';
import {
  FETCH_SUPPLIERS_REQUEST,
  FETCH_SUPPLIERS_SUCCESS,
  FETCH_SUPPLIERS_FAIL,
  ADD_SUPPLIER_REQUEST,
  ADD_SUPPLIER_SUCCESS,
  ADD_SUPPLIER_FAIL,
  EDIT_SUPPLIER_REQUEST,
  EDIT_SUPPLIER_SUCCESS,
  EDIT_SUPPLIER_FAIL,
  DELETE_SUPPLIER_REQUEST,
  DELETE_SUPPLIER_SUCCESS,
  DELETE_SUPPLIER_FAIL,
} from '../constants/supplierConstants';
import { Supplier } from '@/types/interface';

const getAuthToken = (): string => {
  return localStorage.getItem('api_token') || '';
};

// Fetch Suppliers
export const _fetchSuppliers = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_SUPPLIERS_REQUEST });
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/suppliers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: FETCH_SUPPLIERS_SUCCESS,
      payload: response.data.data.suppliers,
    });
    console.log(response)
  } catch (error: any) {
    dispatch({
      type: FETCH_SUPPLIERS_FAIL,
      payload: error.message || 'Failed to fetch suppliers',
    });
  }
};

// Add Supplier
export const _addSupplier = (newSupplier: Supplier) => async (dispatch: Dispatch) => {
  dispatch({ type: ADD_SUPPLIER_REQUEST });
  try {
    const token = getAuthToken();
    const response = await axios.post(
      '${process.env.NEXT_PUBLIC_BASE_URL}/suppliers',
      newSupplier,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: ADD_SUPPLIER_SUCCESS, payload: response.data.data.supplier });
  } catch (error: any) {
    dispatch({ type: ADD_SUPPLIER_FAIL, payload: error.message });
  }
};

// Edit Supplier
export const _editSupplier = (supplierId: number, updatedSupplier: Supplier) => async (dispatch: Dispatch) => {
  dispatch({ type: EDIT_SUPPLIER_REQUEST });
  try {
    const token = getAuthToken();
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/suppliers/${supplierId}`,
      updatedSupplier,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: EDIT_SUPPLIER_SUCCESS, payload: response.data.data.supplier });
  } catch (error: any) {
    dispatch({ type: EDIT_SUPPLIER_FAIL, payload: error.message });
  }
};

// Delete Supplier
export const _deleteSupplier = (supplierId: number) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_SUPPLIER_REQUEST });
  try {
    const token = getAuthToken();
    await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/suppliers/${supplierId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: DELETE_SUPPLIER_SUCCESS, payload: supplierId });
  } catch (error: any) {
    dispatch({ type: DELETE_SUPPLIER_FAIL, payload: error.message });
  }
};
