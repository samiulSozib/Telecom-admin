import { Dispatch } from "redux";
import axios from "axios";

import {
    FETCH_DASHBOARD_DATA_REQUEST,
    FETCH_DASHBOARD_DATA_SUCCESS,
    FETCH_DASHBOARD_DATA_FAIL
} from '../constants/dashboardConstants'


export const _fetchDashboardData=()=>async(dispatch:Dispatch)=>{
    dispatch({type:FETCH_DASHBOARD_DATA_REQUEST})

    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`, {
            headers: {
                Authorization: `Bearer 553|BneW90obh1oiTN17e3mqtxJzgG61UdTDUged1XQG `,
            },
        });
        dispatch({type:FETCH_DASHBOARD_DATA_SUCCESS,payload:response.data.data})
    }catch(error:any){
        dispatch({type:FETCH_DASHBOARD_DATA_FAIL,payload:error.message})
    }
}
