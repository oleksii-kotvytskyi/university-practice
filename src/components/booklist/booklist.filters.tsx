import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { FilterType } from "../../types";
import { setVisibilityFilter } from "../../redux/filters/actions";
import { RootState } from "../../redux/store";

type BookListProps = {
  filter: FilterType;
  setFilter: (v: FilterType) => void;
};

class FiltersForBookList extends React.Component<BookListProps> {
  constructor(props: any) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    name: keyof FilterType
  ) {
    const { value } = e.target;
    const { setFilter, filter } = this.props;

    setFilter({ ...filter, [name]: value });
  }

  render() {
    const { filter } = this.props;
    return (
      <form className="pl-5 form-inline mt-4 d-flex">
        <input
          className="form-control col-6 col-md-3 col-xl-2 mr-5"
          type="text"
          placeholder="Search books by title"
          onChange={(e) => this.handleChange(e, "title")}
          value={filter.title}
        />
        <select
          className="form-control col-5 col-md-3 col-xl-2"
          onChange={(e) => this.handleChange(e, "price")}
          value={filter.price}
        >
          <option value="all">Price</option>
          <option value="0">0-15$</option>
          <option value="15">15-30$</option>
          <option value="30">30$+</option>
        </select>
      </form>
    );
  }
}

const mapDispathcToProps = (dispatch: Dispatch<any>) => ({
  setFilter: (filter: FilterType) => dispatch(setVisibilityFilter(filter)),
});

export default connect(
  (state: RootState) => ({
    filter: state.filterReducer,
  }),
  mapDispathcToProps
)(FiltersForBookList);
