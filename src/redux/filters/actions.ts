import { FilterType } from "../../types";
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

export const SORT_BY = {
  title: "",
  price: "all",
};

export const setVisibilityFilter = (filter: FilterType) => ({
  type: SET_VISIBILITY_FILTER,
  payload: {
    filter,
  },
});
