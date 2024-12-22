import { Dispatch } from "redux";
import axios from "axios";

import {
    FETCH_CURRENCIES_REQUEST,
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_FAILURE
} from '../constants/currenciesConstants'

import { Currency } from "../reducers/currenciesReducer";

export const fetchCurrencies=()=>async(dispatch:Dispatch)=>{
    dispatch({type:FETCH_CURRENCIES_REQUEST})

    try{
        const response = await axios.get<Currency[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/currencies`, {
            headers: {
                Authorization: `Bearer 553|BneW90obh1oiTN17e3mqtxJzgG61UdTDUged1XQG `,
            },
        });
        dispatch({type:FETCH_CURRENCIES_SUCCESS,payload:response.data})
    }catch(error:any){
        dispatch({type:FETCH_CURRENCIES_FAILURE,payload:error.message})
    }
}
