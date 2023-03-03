import {
  GET_BOOK_SUCCES,
  GET_BOOK_ERROR,
  GET_BOOK_REQUEST,
  REMOVE_BOOK_FROM_STORE,
} from './actions';

const initialState = {
  book: undefined,
  error: undefined,
  isLoading: false,
};

const bookReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case GET_BOOK_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_BOOK_SUCCES: {
      return {
        ...state,
        isLoading: false,
        book: action.payload,
        error: undefined,
      };
    }
    case GET_BOOK_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case REMOVE_BOOK_FROM_STORE: {
      return {
        ...state,
        book: undefined,
        error: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export default bookReducer;
