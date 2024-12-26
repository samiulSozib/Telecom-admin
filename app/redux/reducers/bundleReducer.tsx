import {
    FETCH_BUNDLE_LIST_REQUEST,
    FETCH_BUNDLE_LIST_SUCCESS,
    FETCH_BUNDLE_LIST_FAIL,
    DELETE_BUNDLE_REQUEST,
    DELETE_BUNDLE_SUCCESS,
    DELETE_BUNDLE_FAIL,
    ADD_BUNDLE_REQUEST,
    ADD_BUNDLE_SUCCESS,
    ADD_BUNDLE_FAIL,
    EDIT_BUNDLE_REQUEST,
    EDIT_BUNDLE_SUCCESS,
    EDIT_BUNDLE_FAIL,
  } from '../constants/bundleConstants';

interface Currency {
    id: number;
    name: string;
    code: string;
    symbol: string;
    ignore_digits_count: string;
    exchange_rate_per_usd: string;
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
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
  }

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

  interface Service {
    id: number;
    service_category_id: number;
    company_id: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    company: Company;
    service_category: ServiceCategory;
  }

  export interface Bundle {
    id: number;
    bundle_code: string;
    service_id: number;
    bundle_title: string;
    bundle_description: string;
    bundle_type: string | null;
    validity_type: string;
    admin_buying_price: string;
    buying_price: string;
    selling_price: string;
    amount: string | null;
    bundle_image_url: string | null;
    currency_id: number;
    expired_date: string | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    service: Service|null;
    currency: Currency|null;
  }

  interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
    page: number | null;
  }

  interface Pagination {
    page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    links: PaginationLink[];
    items_per_page: number;
    total: number;
  }


  interface BundleState {
    bundles: Bundle[];
    loading: boolean;
    error: string | null;
    pagination: Pagination | null;
  }

  const initialState: BundleState = {
    bundles: [],
    loading: false,
    error: null,
    pagination: null,
  };

  const bundleReducer = (state = initialState, action: any): BundleState => {
    switch (action.type) {
      case FETCH_BUNDLE_LIST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_BUNDLE_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          bundles: action.payload.data,
          pagination: action.payload.pagination,
          error: null,
        };
      case FETCH_BUNDLE_LIST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        };
      case DELETE_BUNDLE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_BUNDLE_SUCCESS:
        return {
          ...state,
          loading: false,
          bundles: state.bundles.filter(bundle => bundle.id !== action.payload.id),
          error: null,
        };
      case DELETE_BUNDLE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        };
      case ADD_BUNDLE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ADD_BUNDLE_SUCCESS:
        return {
          ...state,
          loading: false,
          bundles: [...state.bundles, action.payload],
          error: null,
        };
      case ADD_BUNDLE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        };
      case EDIT_BUNDLE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case EDIT_BUNDLE_SUCCESS:
        return {
          ...state,
          loading: false,
          bundles: state.bundles.map(bundle =>
            bundle.id === action.payload ? { ...bundle, ...action.payload } : bundle
          ),
          error: null,
        };
      case EDIT_BUNDLE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        };
      default:
        return state;
    }
  };

  export default bundleReducer;
