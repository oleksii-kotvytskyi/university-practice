import { getBooks as getBooksAPI } from "../../api/books";
import { getToken } from "../sign-in/reducer";
import { BookI } from "../../types";
import { RootState, AppDispatch } from "../store";

export const GET_BOOKS_REQUEST = "GET_BOOKS_REQUEST";
export const GET_BOOKS_SUCCES = "GET_BOOKS_SUCCES";
export const GET_BOOKS_ERROR = "GET_BOOKS_ERROR";

export type CONST_TYPE =
  | "GET_BOOKS_REQUEST"
  | "GET_BOOKS_SUCCES"
  | "GET_BOOKS_ERROR";

export const getBooksRequest = () => ({
  type: GET_BOOKS_REQUEST,
});

export const getBooksSucces = (response: BookI[]) => ({
  type: GET_BOOKS_SUCCES,
  payload: response,
});

export const getBooksError = (err: string) => ({
  type: GET_BOOKS_ERROR,
  payload: err,
});

export const getBooks = () => (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  const token = getToken(getState());

  dispatch(getBooksRequest());
  getBooksAPI(token)
    .then(({ data }) => dispatch(getBooksSucces(data)))
    .catch((err) => dispatch(getBooksError(err)));
};
