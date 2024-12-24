import { Dispatch } from "redux";
import axios from "axios";

import {
    FETCH_COUNTRIES_REQUEST,
    FETCH_COUNTRIES_SUCCESS,
    FETCH_COUNTRIES_FAIL
} from '../constants/countriesConstants'


export const _fetchCountries=()=>async(dispatch:Dispatch)=>{
    dispatch({type:FETCH_COUNTRIES_REQUEST})

    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/countries`, {
            headers: {
                Authorization: `Bearer 553|BneW90obh1oiTN17e3mqtxJzgG61UdTDUged1XQG `,
            },
        });
        //console.log(response)
        dispatch({type:FETCH_COUNTRIES_SUCCESS,payload:response.data.data.countries})
    }catch(error:any){
        dispatch({type:FETCH_COUNTRIES_FAIL,payload:error.message})
    }
}
