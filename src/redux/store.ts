import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import signInReducer from "./sign-in/reducer";
import booksReducer from "./books/reducer";
import bookReducer from "./book/reducer";
import cartReducer from "./cart/reducer";
import filterReducer from "./filters/reducer";

const rootReducer = combineReducers({
  signInReducer,
  booksReducer,
  bookReducer,
  cartReducer,
  filterReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
