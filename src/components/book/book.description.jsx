import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBook, removeBookFromStore } from '../../redux/book/actions';

const BookDescription = props => {
  const { book } = props;

  return (
    <>
      {book && (
        <div
          className="card mb-3 col-sm-10 col-md-6 bg-light ml-auto mr-auto"
          style={{ padding: 0 }}
        >
          <div className="row no-gutters">
            <div className="pl-3 pt-3 col-md-4 pr-3">
              <img src={book.cover} className="card-img" alt={book.title} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Autor: {book.author}</p>
                <p className="card-text">Level: {book.level}</p>
                <p className="card-text">Tags: {book.tags}</p>
              </div>
            </div>
          </div>
          <div className="card-footer mt-3">{book.description}</div>
        </div>
      )}
    </>
  );
};

BookDescription.defaultProps = {
  book: PropTypes.undefined,
};

BookDescription.propTypes = {
  book: PropTypes.shape({
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    tags: PropTypes.oneOfType([PropTypes.array]).isRequired,
    description: PropTypes.string.isRequired,
  }),
};

const mapDispatchToProps = dispatch => ({
  getBookCT: id => dispatch(getBook(id)),
  removeBookFromStoreCT: () => dispatch(removeBookFromStore()),
});

export default connect(
  state => ({
    book: state.bookReducer.book,
  }),
  mapDispatchToProps,
)(BookDescription);
