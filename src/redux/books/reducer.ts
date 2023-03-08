import {
  GET_BOOKS_SUCCES,
  GET_BOOKS_ERROR,
  GET_BOOKS_REQUEST,
  CONST_TYPE,
} from "./actions";
import { BookI } from "../../types";

type StateType = {
  books?: BookI;
  error?: string;
  isLoading: boolean;
};

const initialState: StateType = {
  books: undefined,
  error: undefined,
  isLoading: false,
};

type Success_T = {
  type: "GET_BOOKS_SUCCES";
  payload: BookI;
};

type Error_T = {
  type: "GET_BOOKS_ERROR";
  payload: string;
};

type Loading_T = {
  type: "GET_BOOKS_REQUEST";
  payload: boolean;
};

type Action = Success_T | Error_T | Loading_T;

const booksReducer = (state = initialState, action: Action): StateType => {
  const { type } = action;

  switch (type) {
    case GET_BOOKS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_BOOKS_SUCCES: {
      return {
        ...state,
        isLoading: false,
        books: action.payload,
        error: undefined,
      };
    }
    case GET_BOOKS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default booksReducer;
