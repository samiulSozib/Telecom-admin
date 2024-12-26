import { Dispatch } from "redux";
import axios from "axios";

import {
    FETCH_COUNTRIES_REQUEST,
    FETCH_COUNTRIES_SUCCESS,
    FETCH_COUNTRIES_FAIL
} from '../constants/countriesConstants'


const getAuthToken = () => {
    return localStorage.getItem("api_token") || ""; // Get the token or return an empty string if not found
  };

export const _fetchCountries=()=>async(dispatch:Dispatch)=>{
    dispatch({type:FETCH_COUNTRIES_REQUEST})

    try{
        const token = getAuthToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/countries`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        //console.log(response)
        dispatch({type:FETCH_COUNTRIES_SUCCESS,payload:response.data.data.countries})
    }catch(error:any){
        dispatch({type:FETCH_COUNTRIES_FAIL,payload:error.message})
    }
}
