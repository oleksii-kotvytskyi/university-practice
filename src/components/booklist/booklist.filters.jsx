import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setVisibilityFilter } from "../../redux/filters/actions";

class FiltersForBookList extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, name) {
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

FiltersForBookList.propTypes = {
  filter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  setFilter: PropTypes.func.isRequired,
};

const mapDispathcToProps = (dispatch) => ({
  setFilter: (filter) => dispatch(setVisibilityFilter(filter)),
});

export default connect(
  (state) => ({
    filter: state.filterReducer,
  }),
  mapDispathcToProps
)(FiltersForBookList);
