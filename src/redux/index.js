import { combineReducers } from 'redux';
import { authenticationReducer } from './_authentication';
import { dashboardReducer } from './_dashboard';

export default combineReducers({
  authentication: authenticationReducer,
  dashboard: dashboardReducer
});
