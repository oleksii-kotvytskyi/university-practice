import { purchaseBooks as purchaseBooksAPI } from '../../api/cart';
import { getToken } from '../sign-in/reducer';

export const ADD_BOOKS_TO_CART = 'ADD_BOOKS_TO_CART';
export const PURCHASE_BOOKS_REQUEST = 'PURCHASE_BOOKS_REQUEST';
export const PURCHASE_BOOKS_SUCCES = 'PURCHASE_BOOKS_SUCCES';
export const PURCHASE_BOOKS_ERROR = 'PURCHASE_BOOKS_ERROR';
export const CLEAR_CART_AFTER_LOGOUT = 'CLEAR_CART_AFTER_LOGOUT';

export const addBooksToCart = books => ({
  type: ADD_BOOKS_TO_CART,
  payload: books,
});

export const purchaseBooksRequest = () => ({
  type: PURCHASE_BOOKS_REQUEST,
});

export const purchaseBooksSucces = () => ({
  type: PURCHASE_BOOKS_SUCCES,
});

export const purchaseBooksError = error => ({
  type: PURCHASE_BOOKS_ERROR,
  payload: error,
});

export const clearCartAfterLogOut = () => ({
  type: CLEAR_CART_AFTER_LOGOUT,
});

export const purchaseBooks = books => (dispatch, getState) => {
  const token = getToken(getState());

  dispatch(purchaseBooksRequest());
  purchaseBooksAPI(token, books)
    .then(() => dispatch(purchaseBooksSucces()))
    .catch(err => dispatch(purchaseBooksError(err)));
};
