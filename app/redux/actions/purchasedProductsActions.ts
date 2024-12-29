import { Dispatch } from 'redux';
import axios from 'axios';
import {
  FETCH_PURCHASED_PRODUCTS_REQUEST,
  FETCH_PURCHASED_PRODUCTS_SUCCESS,
  FETCH_PURCHASED_PRODUCTS_FAIL,
  ADD_PURCHASED_PRODUCT_REQUEST,
  ADD_PURCHASED_PRODUCT_SUCCESS,
  ADD_PURCHASED_PRODUCT_FAIL,
  EDIT_PURCHASED_PRODUCT_REQUEST,
  EDIT_PURCHASED_PRODUCT_SUCCESS,
  EDIT_PURCHASED_PRODUCT_FAIL,
  DELETE_PURCHASED_PRODUCT_REQUEST,
  DELETE_PURCHASED_PRODUCT_SUCCESS,
  DELETE_PURCHASED_PRODUCT_FAIL,
} from '../constants/purchasedProductsConstants';
import { PurchasedProduct } from '@/types/interface';

const getAuthToken = (): string => {
  return localStorage.getItem('api_token') || '';
};

// Fetch Purchased Products
export const _fetchPurchasedProducts = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_PURCHASED_PRODUCTS_REQUEST });
  try {
    const token = getAuthToken();
    const response = await axios.get(
      '${process.env.NEXT_PUBLIC_BASE_URL}/purchased-products',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: FETCH_PURCHASED_PRODUCTS_SUCCESS,
      payload: response.data.data.purchasedproducts,
    });
    console.log(response)
  } catch (error: any) {
    dispatch({
      type: FETCH_PURCHASED_PRODUCTS_FAIL,
      payload: error.message || 'Failed to fetch purchased products',
    });
  }
};

// Add Purchased Product
export const _addPurchasedProduct = (newProduct: PurchasedProduct) => async (dispatch: Dispatch) => {
  dispatch({ type: ADD_PURCHASED_PRODUCT_REQUEST });
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/purchased-products`,
      newProduct,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: ADD_PURCHASED_PRODUCT_SUCCESS,
      payload: response.data.data.purchasedproduct,
    });
  } catch (error: any) {
    dispatch({ type: ADD_PURCHASED_PRODUCT_FAIL, payload: error.message });
  }
};

// Edit Purchased Product
export const _editPurchasedProduct = (productId: number, updatedProduct: PurchasedProduct) => async (dispatch: Dispatch) => {
  dispatch({ type: EDIT_PURCHASED_PRODUCT_REQUEST });
  try {
    const token = getAuthToken();
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/purchased-products/${productId}`,
      updatedProduct,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: EDIT_PURCHASED_PRODUCT_SUCCESS, payload: response.data.data.purchasedproduct });
  } catch (error: any) {
    dispatch({ type: EDIT_PURCHASED_PRODUCT_FAIL, payload: error.message });
  }
};

// Delete Purchased Product
export const _deletePurchasedProduct = (productId: number) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_PURCHASED_PRODUCT_REQUEST });
  try {
    const token = getAuthToken();
    await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/purchased-products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: DELETE_PURCHASED_PRODUCT_SUCCESS, payload: productId });
  } catch (error: any) {
    dispatch({ type: DELETE_PURCHASED_PRODUCT_FAIL, payload: error.message });
  }
};
