import { Dispatch } from "redux";
import axios from "axios";

import {
    FETCH_TELEGRAM_LIST_REQUEST,
    FETCH_TELEGRAM_LIST_SUCCESS,
    FETCH_TELEGRAM_LIST_FAIL
} from '../constants/telegramConstants'


export const _fetchTelegramList=()=>async(dispatch:Dispatch)=>{
    dispatch({type:FETCH_TELEGRAM_LIST_REQUEST})

    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/telegram-chat-ids`, {
            headers: {
                Authorization: `Bearer 553|BneW90obh1oiTN17e3mqtxJzgG61UdTDUged1XQG `,
            },
        });
        //console.log(response)
        dispatch({type:FETCH_TELEGRAM_LIST_SUCCESS,payload:response.data.data.telegram_chat_ids})
    }catch(error:any){
        dispatch({type:FETCH_TELEGRAM_LIST_FAIL,payload:error.message})
    }
}
