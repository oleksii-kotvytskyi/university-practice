import { getBooks as getBooksAPI } from '../../api/books';
import { getToken } from '../sign-in/reducer';

export const GET_BOOKS_REQUEST = 'GET_BOOKS_REQUEST';
export const GET_BOOKS_SUCCES = 'GET_BOOKS_SUCCES';
export const GET_BOOKS_ERROR = 'GET_BOOKS_ERROR';

export const getBooksRequest = () => ({
  type: GET_BOOKS_REQUEST,
});

export const getBooksSucces = response => ({
  type: GET_BOOKS_SUCCES,
  payload: response,
});

export const getBooksError = err => ({
  type: GET_BOOKS_ERROR,
  payload: err,
});

export const getBooks = () => (dispatch, getState) => {
  const token = getToken(getState());

  dispatch(getBooksRequest());
  getBooksAPI(token)
    .then(({ data }) => dispatch(getBooksSucces(data)))
    .catch(err => dispatch(getBooksError(err)));
};
