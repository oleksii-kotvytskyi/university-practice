import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { getBooks } from "../../redux/books/actions";
import { RootState } from "../../redux/store";
import BookListItem from "../booklist-item";
import { BookI } from "../../types";
import Spinner from "../spinner";
import FiltersForBookList from "./booklist.filters";
import sorted from "../../helpers/sorted";

type BookListProps = {
  books?: BookI;
  getBooksCT: () => void;
  isLoading: boolean;
  error?: string;
  filter: {
    title: string;
    price: string;
  };
};

class BookList extends React.Component<BookListProps> {
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
          <div className="booklist-erroMessage">
            Oops... Something went wrong
          </div>
        )}
        {books && (
          <>
            <FiltersForBookList />
            <ul className="bookList">
              {filterBooks?.map((book) => (
                <BookListItem key={book.id} book={book} />
              ))}
            </ul>
          </>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getBooksCT: () => dispatch(getBooks()),
});

export default connect(
  (state: RootState) => ({
    books: state.booksReducer.books,
    isLoading: state.booksReducer.isLoading,
    error: state.booksReducer.error,
    filter: state.filterReducer,
  }),
  mapDispatchToProps
)(BookList);
