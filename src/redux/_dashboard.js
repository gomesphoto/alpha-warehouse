import { apiGetOrders } from '../helpers/api';
import { convertCsvToJson } from '../helpers/utilities';

// -- Constants ------------------------------------------------------------- //
const DASHBOARD_GET_ORDERS_REQUEST = 'dashboard/DASHBOARD_GET_ORDERS_REQUEST';
const DASHBOARD_GET_ORDERS_SUCCESS = 'dashboard/DASHBOARD_GET_ORDERS_SUCCESS';
const DASHBOARD_GET_ORDERS_FAILURE = 'dashboard/DASHBOARD_GET_ORDERS_FAILURE';
const DASHBOARD_UPDATE_QUERY = 'dashboard/DASHBOARD_UPDATE_QUERY';
const DASHBOARD_IMPORT_FILE_REQUEST = 'dashboard/DASHBOARD_IMPORT_FILE_REQUEST';
const DASHBOARD_IMPORT_FILE_SUCCESS = 'dashboard/DASHBOARD_IMPORT_FILE_SUCCESS';
const DASHBOARD_IMPORT_FILE_FAILURE = 'dashboard/DASHBOARD_IMPORT_FILE_FAILURE';

// -- Actions --------------------------------------------------------------- //
export const dashboardGetOrders = () =>
  (dispatch) => {
    dispatch({ type: DASHBOARD_GET_ORDERS_REQUEST });
    apiGetOrders()
    .then((orders) => {
      dispatch({
        type: DASHBOARD_GET_ORDERS_SUCCESS,
        payload: orders
      });
    })
    .catch((error) => {
      dispatch({ type: DASHBOARD_GET_ORDERS_FAILURE });
    });
  };

export const dashboardImportFile = file =>
  (dispatch) => {
    dispatch({ type: DASHBOARD_IMPORT_FILE_REQUEST });
    convertCsvToJson()
    .then((json) => {
      dispatch({
        type: DASHBOARD_IMPORT_FILE_SUCCESS,
        payload: json.orders
      });
    })
    .catch((error) => {
      dispatch({ type: DASHBOARD_IMPORT_FILE_FAILURE });
    });
  };

export const dashboardUpdateSearchQuery = ({ target }) => ({
  type: DASHBOARD_UPDATE_QUERY,
  payload: target.value
});


// -- Reducer --------------------------------------------------------------- //
const INITIAL_STATE = {
  fetching: false,
  importFetching: false,
  orders: [],
  query: ''
};

export const dashboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DASHBOARD_GET_ORDERS_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case DASHBOARD_GET_ORDERS_SUCCESS:
      return {
        ...state,
        fetching: false,
        orders: action.payload
      };
    case DASHBOARD_GET_ORDERS_FAILURE:
      return { ...state, fetching: false };
    case DASHBOARD_UPDATE_QUERY:
      return { ...state, email: action.payload };
    case DASHBOARD_IMPORT_FILE_REQUEST:
      return {
        ...state,
        importFetching: true
      };
    case DASHBOARD_IMPORT_FILE_SUCCESS:
      return {
        ...state,
        importFetching: false,
        orders: [...state.orders, action.payload]
      };
    case DASHBOARD_IMPORT_FILE_FAILURE:
      return { ...state, importFetching: false };
    default:
      return state;
  }
};
