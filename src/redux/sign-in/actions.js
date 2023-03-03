import { signin as signinAPI } from '../../api/sign-in';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const HANDLE_LOGOUT = 'HANDLE_LOGOUT';

export const signInRequest = () => ({
  type: SIGN_IN_REQUEST,
});

export const signInSucces = response => ({
  type: SIGN_IN_SUCCESS,
  payload: response,
});

export const signInError = error => ({
  type: SIGN_IN_ERROR,
  payload: error,
});

export const handleLogout = () => ({
  type: HANDLE_LOGOUT,
});

export const signIn = userInfo => dispatch => {
  dispatch(signInRequest());

  signinAPI(userInfo)
    .then(({ data }) => dispatch(signInSucces(data)))
    .catch(err => dispatch(signInError(err)));
};
