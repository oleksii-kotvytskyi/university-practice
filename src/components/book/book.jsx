import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Spinner from '../spinner';
import BookDescription from './book.description';
import BookCart from './book.cart';
import { getBook, removeBookFromStore } from '../../redux/book/actions';

class Book extends React.Component {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      getBookCT,
    } = this.props;
    getBookCT(id);
  }

  componentWillUnmount() {
    const { removeBookFromStoreCT } = this.props;
    removeBookFromStoreCT();
  }

  render() {
    const { isLoading, error } = this.props;

    return (
      <>
        {isLoading && <Spinner />}
        {error && (
          <div className="booklist-erroMessage">Oops... Something went wrong </div>
        )}
        <div className="container-fluid d-flex justify-content-between mt-5 flex-wrap">
          <BookDescription />
          <BookCart />
        </div>
      </>
    );
  }
}

Book.defaultProps = {
  error: PropTypes.undefined,
};

Book.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
  getBookCT: PropTypes.func.isRequired,
  removeBookFromStoreCT: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.object]),
  isLoading: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getBookCT: id => dispatch(getBook(id)),
  removeBookFromStoreCT: () => dispatch(removeBookFromStore()),
});

export default connect(
  state => ({
    isLoading: state.bookReducer.isLoading,
    error: state.bookReducer.error,
  }),
  mapDispatchToProps,
)(withRouter(Book));
