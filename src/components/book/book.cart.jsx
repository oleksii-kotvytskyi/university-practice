import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addBooksToCart } from "../../redux/cart/actions";

class BookCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countPrice: 0,
      countBooks: 0,
    };
    this.inputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetData = this.resetData.bind(this);
  }

  handleChange(e) {
    const { book } = this.props;
    const price = book ? book.price : 0;
    const result = (e.target.value * price).toFixed(2);
    this.setState({ countPrice: Number(result), countBooks: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { addBooksToCartCT, book } = this.props;
    const { countBooks, countPrice } = this.state;
    const result = {
      id: book.id,
      count: countBooks,
      totalPrice: countPrice,
      title: book.title,
    };
    addBooksToCartCT(result);
    this.resetData();
  }

  resetData() {
    this.inputRef.current.value = 0;
    this.setState({
      countPrice: 0,
      countBooks: 0,
    });
  }

  render() {
    const { book, booksInCart } = this.props;
    const { countPrice } = this.state;
    let actualCountBooks = 0;
    if (book) {
      actualCountBooks = book.count;
    }
    if (booksInCart && book) {
      const findBook = booksInCart.find((el) => el.id === book.id);

      if (findBook) {
        actualCountBooks = book.count - Number(findBook.count);
      }
    }

    return (
      <>
        {book && (
          <div className="card mb-3 col-sm-10 col-md-5 bg-light ml-auto mr-auto bg-light align-self-center">
            <form onSubmit={this.handleSubmit}>
              <div className="d-flex justify-content-between mt-3">
                <span>Price:</span>
                <span>{book.price}$</span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <span>In Stock:</span>
                <span>{actualCountBooks} books</span>
              </div>
              <label
                className="d-flex justify-content-between mt-3"
                htmlFor="countbooks"
              >
                Count
                <input
                  id="countbooks"
                  ref={this.inputRef}
                  type="number"
                  className="form-control"
                  width="90"
                  min={0}
                  max={actualCountBooks}
                  onChange={this.handleChange}
                  placeholder="0"
                  style={{ width: "80px" }}
                />
              </label>
              <div className="d-flex justify-content-between mt-3">
                <span>Total Price:</span>
                <span>{countPrice}$</span>
              </div>
              <button
                type="submit"
                className="btn btn-dark float-right mt-3 mb-3"
                disabled={actualCountBooks === 0}
              >
                Add To Card
              </button>
            </form>
          </div>
        )}
      </>
    );
  }
}

BookCart.defaultProps = {
  book: PropTypes.undefined,
  booksInCart: PropTypes.undefined,
};

BookCart.propTypes = {
  book: PropTypes.shape({
    cover: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  booksInCart: PropTypes.oneOfType([PropTypes.array]),
  addBooksToCartCT: PropTypes.func.isRequired,
};

const mapDispathToProps = (dispatch) => ({
  addBooksToCartCT: (books) => dispatch(addBooksToCart(books)),
});

export default connect((state) => {
  return {
    book: state.bookReducer.book,
    booksInCart: state.cartReducer.books,
  };
}, mapDispathToProps)(BookCart);
