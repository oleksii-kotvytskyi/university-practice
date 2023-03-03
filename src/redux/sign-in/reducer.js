import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN_REQUEST,
  HANDLE_LOGOUT,
} from './actions';

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : undefined;

const initialState = {
  isAuthentificated: !!userInfo,
  error: undefined,
  avatar: userInfo ? userInfo.avatar : undefined,
  token: userInfo ? userInfo.token : undefined,
  username: userInfo ? userInfo.username : undefined,
  isLoading: false,
};

export const getToken = state => state.signInReducer.token;

export const getAuthentificated = state => state.signInReducer.isAuthentificated;

const signInReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case SIGN_IN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SIGN_IN_SUCCESS: {
      const {
        payload: { avatar, token, username },
      } = action;
      const signInUserInfo = {
        token,
        avatar,
        username,
      };
      localStorage.setItem('userInfo', JSON.stringify(signInUserInfo));
      return {
        ...state,
        isAuthentificated: true,
        avatar,
        token,
        username,
        isLoading: false,
      };
    }
    case SIGN_IN_ERROR: {
      const { payload } = action;
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    }
    case HANDLE_LOGOUT: {
      localStorage.removeItem('userInfo');
      if (localStorage.getItem('cart')) {
        localStorage.removeItem('cart');
      }
      return {
        ...state,
        avatar: undefined,
        token: undefined,
        username: undefined,
        isAuthentificated: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default signInReducer;
