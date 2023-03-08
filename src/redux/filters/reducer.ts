import { SET_VISIBILITY_FILTER, SORT_BY } from "./actions";
import { FilterType } from "../../types";

const filterReducer = (
  state = SORT_BY,
  action: {
    type: "SET_VISIBILITY_FILTER";
    payload: {
      filter: FilterType;
    };
  }
) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.payload.filter;
    default:
      return state;
  }
};

export default filterReducer;
