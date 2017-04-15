import { apiLogin, apiLogout } from '../helpers/api';
import { getSession, setSession, deleteSession } from '../helpers/utilities';

// -- Constants ------------------------------------------------------------- //
const AUTHENTICATION_REQUEST = 'authentication/AUTHENTICATION_REQUEST';
const AUTHENTICATION_SUCCESS = 'authentication/AUTHENTICATION_SUCCESS';
const AUTHENTICATION_FAILURE = 'authentication/AUTHENTICATION_FAILURE';
const AUTHENTICATION_SIGNOUT_REQUEST = 'authentication/AUTHENTICATION_SIGNOUT_REQUEST';
const AUTHENTICATION_SIGNOUT_SUCCESS = 'authentication/AUTHENTICATION_SIGNOUT_SUCCESS';
const AUTHENTICATION_UPDATE_EMAIL = 'authentication/AUTHENTICATION_UPDATE_EMAIL';
const AUTHENTICATION_UPDATE_PASSWORD = 'authentication/AUTHENTICATION_UPDATE_PASSWORD';

// -- Actions --------------------------------------------------------------- //
export const authenticationLogin = (email, password) =>
  (dispatch) => {
    dispatch({ type: AUTHENTICATION_REQUEST });
    apiLogin(email, password)
    .then(({ data: profilesData }) => {
      setSession(
        profilesData.email,
        Date.now() + 300000, // 5 minutes
        Date.now() + 3000000, // 50 minutes
        profilesData.profile,
      );
      dispatch({
        type: AUTHENTICATION_SUCCESS,
        payload: getSession().profile
      });
      window.router.transitionTo('/dashboard/home');
    })
    .catch((error) => {
      dispatch({ type: AUTHENTICATION_FAILURE });
    });
  };

export const authenticationLogout = () =>
  (dispatch) => {
    dispatch({ type: AUTHENTICATION_SIGNOUT_REQUEST });
    apiLogout()
    .then(() => {
      deleteSession();
      dispatch({ type: AUTHENTICATION_SIGNOUT_SUCCESS });
      window.router.transitionTo('/login');
      window.rogueDispatch({ type: 'RESET' });
    });
  };

export const authenticationUpdateEmail = email => ({
  type: AUTHENTICATION_UPDATE_EMAIL,
  payload: email
});

export const authenticationUpdatePassword = password => ({
  type: AUTHENTICATION_UPDATE_PASSWORD,
  payload: password
});


// -- Reducer --------------------------------------------------------------- //
const INITIAL_STATE = {
  fetching: false,
  email: '',
  password: '',
  profile: []
};

export const authenticationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTHENTICATION_REQUEST:
    case AUTHENTICATION_SIGNOUT_REQUEST:
      return { ...state, fetching: true };
    case AUTHENTICATION_SUCCESS:
      return { ...state, fetching: false, password: '', email: '', profile: action.payload || '' };
    case AUTHENTICATION_SIGNOUT_SUCCESS:
      return { ...state, fetching: false, password: '', email: '', profile: [] };
    case AUTHENTICATION_FAILURE:
      return { ...state, fetching: false };
    case AUTHENTICATION_UPDATE_EMAIL:
      return { ...state, email: action.payload };
    case AUTHENTICATION_UPDATE_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
