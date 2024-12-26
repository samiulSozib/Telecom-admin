import {
    FETCH_SERVICE_LIST_REQUEST,
    FETCH_SERVICE_LIST_SUCCESS,
    FETCH_SERVICE_LIST_FAIL,
    DELETE_SERVICE_REQUEST,
    DELETE_SERVICE_SUCCESS,
    DELETE_SERVICE_FAIL,
    ADD_SERVICE_REQUEST,
    ADD_SERVICE_SUCCESS,
    ADD_SERVICE_FAIL,
    EDIT_SERVICE_REQUEST,
    EDIT_SERVICE_SUCCESS,
    EDIT_SERVICE_FAIL,
  } from "../constants/serviceConstants";

  // Define service and company types
interface ServiceCategory {
    id: number;
    category_name: string;
    type: string;
    service_category_sub_type_id: number | null;
    category_image_url: string | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
  }

interface Company {
    id: number;
    company_name: string;
    company_logo: string;
    country_id: number;
    telegram_chat_id: number;
    country: {
      country_name: string;
      country_flag_image_url: string;
      country_telecom_code: string;
      phone_number_length: string;
    };
  }

  export interface Service {
    id: number;
    service_category_id: number;
    service_name:string,
    company_id: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    service_category: ServiceCategory|null;
    company: Company | null;
  }

  interface State {
    loading: boolean;
    services: Service[];
    error: string | null;
  }

  const initialState: State = {
    loading: false,
    services: [],
    error: null,
  };

  const serviceReducer = (state = initialState, action: any): State => {
    switch (action.type) {
      case FETCH_SERVICE_LIST_REQUEST:
        return { ...state, loading: true };
      case FETCH_SERVICE_LIST_SUCCESS:
        return { ...state, loading: false, services: action.payload };
      case FETCH_SERVICE_LIST_FAIL:
        return { ...state, loading: false, error: action.payload };
      case DELETE_SERVICE_REQUEST:
        return { ...state, loading: true };
      case DELETE_SERVICE_SUCCESS:
        return {
          ...state,
          loading: false,
          services: state.services.filter((service) => service.id !== action.payload),
        };
      case DELETE_SERVICE_FAIL:
        return { ...state, loading: false, error: action.payload };
      case ADD_SERVICE_REQUEST:
        return { ...state, loading: true };
      case ADD_SERVICE_SUCCESS:
        return {
          ...state,
          loading: false,
          services: [...state.services, action.payload],
        };
      case ADD_SERVICE_FAIL:
        return { ...state, loading: false, error: action.payload };
      case EDIT_SERVICE_REQUEST:
        return { ...state, loading: true };
      case EDIT_SERVICE_SUCCESS:
        return {
          ...state,
          loading: false,
          services: state.services.map((service) =>
            service.id === action.payload.id ? action.payload : service
          ),
        };
      case EDIT_SERVICE_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export default serviceReducer;
