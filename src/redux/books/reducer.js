import { GET_BOOKS_SUCCES, GET_BOOKS_ERROR, GET_BOOKS_REQUEST } from './actions';

const initialState = {
  books: undefined,
  error: undefined,
  isLoading: false,
};

const booksReducer = (state = initialState, action) => {
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
