import { apiGetOrders } from '../helpers/api';

// -- Constants ------------------------------------------------------------- //
const DASHBOARD_GET_ORDERS_REQUEST = 'dashboard/DASHBOARD_GET_ORDERS_REQUEST';
const DASHBOARD_GET_ORDERS_SUCCESS = 'dashboard/DASHBOARD_GET_ORDERS_SUCCESS';
const DASHBOARD_GET_ORDERS_FAILURE = 'dashboard/DASHBOARD_GET_ORDERS_FAILURE';
const DASHBOARD_UPDATE_QUERY = 'dashboard/DASHBOARD_UPDATE_QUERY';
const DASHBOARD_IMPORT_FILE = 'dashboard/DASHBOARD_IMPORT_FILE';

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

export const dashboardImportFile = arrayBuffer =>
  (dispatch) => {
    const objectKeys = arrayBuffer.shift();
    function order(details) {
      details.map((detail, idx) => this[objectKeys[idx]] = detail);
    }
    const jsonFile = arrayBuffer.map((x, idx) => new order(x));
    dispatch({ type: DASHBOARD_IMPORT_FILE, payload: jsonFile });
  };

export const dashboardUpdateSearchQuery = ({ target }) => ({
  type: DASHBOARD_UPDATE_QUERY,
  payload: target.value
});


// -- Reducer --------------------------------------------------------------- //
const INITIAL_STATE = {
  fetching: false,
  orders: [],
  query: '',
  modalShow: false
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
    case DASHBOARD_IMPORT_FILE:
      return { ...state, orders: action.payload };
    default:
      return state;
  }
};
