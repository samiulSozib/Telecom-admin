import {
    FETCH_TELEGRAM_LIST_REQUEST,
    FETCH_TELEGRAM_LIST_SUCCESS,
    FETCH_TELEGRAM_LIST_FAIL
} from '../constants/telegramConstants'

interface TelegramChat {
    id: number;
    chat_id: number;
    group_name: string;
    created_at: string;
    updated_at: string;
}

interface TelegramState {
    loading: boolean;
    telegramChatIds: TelegramChat[];
    error: string | null;
}

const initialState: TelegramState = {
    loading: false,
    telegramChatIds: [],
    error: null,
};

export const telegramReducer = (state = initialState, action: any): TelegramState => {
    switch (action.type) {
        case FETCH_TELEGRAM_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_TELEGRAM_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                telegramChatIds: action.payload,
                error: null,
            };
        case FETCH_TELEGRAM_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
