import { Dispatch } from "redux";
import axios from "axios";

import {
    FETCH_CURRENCIES_REQUEST,
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_FAILURE
} from '../constants/currenciesConstants'

const getAuthToken = () => {
    return localStorage.getItem("api_token") || ""; // Get the token or return an empty string if not found
  };

export const _fetchCurrencies=()=>async(dispatch:Dispatch)=>{
    dispatch({type:FETCH_CURRENCIES_REQUEST})

    try{
        const token = getAuthToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/currencies`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({type:FETCH_CURRENCIES_SUCCESS,payload:response.data.data.currencies})
    }catch(error:any){
        dispatch({type:FETCH_CURRENCIES_FAILURE,payload:error.message})
    }
}
