import { apiGetOrders } from '../helpers/api';
import { camelize } from '../helpers/utilities';

// -- Constants ------------------------------------------------------------- //
const DASHBOARD_GET_ORDERS_REQUEST = 'dashboard/DASHBOARD_GET_ORDERS_REQUEST';
const DASHBOARD_GET_ORDERS_SUCCESS = 'dashboard/DASHBOARD_GET_ORDERS_SUCCESS';
const DASHBOARD_GET_ORDERS_FAILURE = 'dashboard/DASHBOARD_GET_ORDERS_FAILURE';
const DASHBOARD_UPDATE_QUERY = 'dashboard/DASHBOARD_UPDATE_QUERY';
const DASHBOARD_IMPORT_FILE = 'dashboard/DASHBOARD_IMPORT_FILE';
const DASHBOARD_TOGGLE_MODAL = 'dashboard/DASHBOARD_TOGGLE_MODAL';

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
    const objectKeys = arrayBuffer
      .shift()
      .map((key) => {
        if (key.includes('Lineitem')) key = key.replace('Lineitem', 'Item');
        if (key.includes('Shipping Zip')) key = key.replace('Shipping Zip', 'Shipping Postal Code');
        if (key.includes('Shipping Province')) key = key.replace('Shipping Province', 'Shipping State');
        if (key.includes('Billing Zip')) key = key.replace('Billing Zip', 'Billing Postal Code');
        if (key.includes('Billing Province')) key = key.replace('Billing Province', 'Billing State');
        return camelize(key);
      });
    arrayBuffer.pop();
    function order(details) {
      details.map((detail, idx) => this[objectKeys[idx]] = detail);
    }
    let jsonFile = arrayBuffer.map((x, idx) => new order(x));
    jsonFile = jsonFile.map((x, idx, arr) => {
      if (!x.email) {
        Object.keys(x).map((key) => {
          if (!x[key]) x[key] = arr[idx - 1][key];
          return key;
        });
      }
      return x;
    });
    dispatch({ type: DASHBOARD_IMPORT_FILE, payload: jsonFile });
  };

export const dashboardUpdateSearchQuery = ({ target }) => ({
  type: DASHBOARD_UPDATE_QUERY,
  payload: target.value
});

export const dashboardToggleModal = () =>
  ({ type: DASHBOARD_TOGGLE_MODAL });


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
    case DASHBOARD_TOGGLE_MODAL:
      return { ...state, modalShow: !state.modalShow };
    default:
      return state;
  }
};
