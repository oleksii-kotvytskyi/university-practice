import { getBook as getBookAPI } from '../../api/book';
import { getToken } from '../sign-in/reducer';

export const GET_BOOK_REQUEST = 'GET_BOOK_REQUEST';
export const GET_BOOK_SUCCES = 'GET_BOOK_SUCCES';
export const GET_BOOK_ERROR = 'GET_BOOK_ERROR';
export const REMOVE_BOOK_FROM_STORE = 'REMOVE_BOOK_FROM_STORE';

export const getBookRequest = () => ({
  type: GET_BOOK_REQUEST,
});

export const getBookSucces = response => ({
  type: GET_BOOK_SUCCES,
  payload: response,
});

export const getBookError = err => ({
  type: GET_BOOK_ERROR,
  payload: err,
});

export const removeBookFromStore = () => ({
  type: REMOVE_BOOK_FROM_STORE,
});

export const getBook = id => (dispatch, getState) => {
  const token = getToken(getState());

  dispatch(getBookRequest());
  getBookAPI(token, id)
    .then(({ data }) => dispatch(getBookSucces(data)))
    .catch(err => dispatch(getBookError(err)));
};
