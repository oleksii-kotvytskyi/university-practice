import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBooks } from '../../redux/books/actions';
import BookListItem from '../booklist-item';
import Spinner from '../spinner';
import FiltersForBookList from './booklist.filters';
import sorted from '../../helpers/sorted';

class BookList extends React.Component {
  componentDidMount() {
    const { books, getBooksCT } = this.props;
    if (!books) getBooksCT();
  }

  render() {
    const { books, isLoading, error, filter } = this.props;
    const filterBooks = books ? sorted(filter, books) : books;

    return (
      <>
        {isLoading && <Spinner />}
        {error && (
          <div className="booklist-erroMessage">Oops... Something went wrong</div>
        )}
        {books && (
          <>
            <FiltersForBookList />
            <ul className="bookList">
              {filterBooks.map(book => (
                <BookListItem key={book.id} book={book} />
              ))}
            </ul>
          </>
        )}
      </>
    );
  }
}
BookList.defaultProps = {
  books: PropTypes.undefined,
  error: PropTypes.undefined,
};

BookList.propTypes = {
  books: PropTypes.oneOfType([PropTypes.array]),
  getBooksCT: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  filter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  error: PropTypes.oneOfType([PropTypes.object]),
};

const mapDispatchToProps = dispatch => ({
  getBooksCT: () => dispatch(getBooks()),
});

export default connect(
  state => ({
    books: state.booksReducer.books,
    isLoading: state.booksReducer.isLoading,
    error: state.booksReducer.error,
    filter: state.filterReducer,
  }),
  mapDispatchToProps,
)(BookList);
