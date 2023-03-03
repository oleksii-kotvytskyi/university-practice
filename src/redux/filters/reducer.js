import { SET_VISIBILITY_FILTER, SORT_BY } from './actions';

const filterReducer = (state = SORT_BY, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.payload.filter;
    default:
      return state;
  }
};

export default filterReducer;
