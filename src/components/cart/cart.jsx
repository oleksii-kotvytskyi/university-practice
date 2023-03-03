import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CartDescription from './cart.description';
import CartIsEmpty from './cart.empty';
import PurchaseMessage from './purchase.message';
import { purchaseBooks } from '../../redux/cart/actions';
import Spinner from '../spinner';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchase: {
        value: false,
        messageSucces: 'Thank you for purchasing books in our store!',
        messageError: 'Request is invalid',
      },
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { purchase } = this.state;
    const { booksInCart, purchaseBooksCT } = this.props;
    const booksForRequest = [];

    booksInCart.forEach(book => {
      for (let i = 0; i < book.count; i += 1) {
        booksForRequest.push(book.id);
      }
    });

    purchaseBooksCT(booksForRequest);
    this.setState({ purchase: { ...purchase, value: true } });
  }

  render() {
    const { booksInCart, isLoading, error } = this.props;
    const {
      purchase: { messageSucces, messageError },
      purchase,
    } = this.state;
    const CartInfo = booksInCart.length > 0 ? <CartDescription /> : <CartIsEmpty />;
    const CartView = purchase.value ? (
      <PurchaseMessage message={error ? messageError : messageSucces} />
    ) : (
      CartInfo
    );

    return (
      <div className="container-fluid">
        <button
          disabled={!booksInCart.length}
          type="button"
          className={`btn ${
            booksInCart.length ? 'btn-success' : 'btn-danger'
          } d-block ml-auto mr-5 mt-5`}
          onClick={this.handleClick}
        >
          Purchase
        </button>
        {isLoading ? <Spinner /> : CartView}
      </div>
    );
  }
}

Cart.defaultProps = {
  error: PropTypes.undefined,
};

Cart.propTypes = {
  booksInCart: PropTypes.oneOfType([PropTypes.array]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  purchaseBooksCT: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.object]),
};

const mapStateToProps = state => {
  return {
    booksInCart: state.cartReducer.books,
    isLoading: state.cartReducer.isLoading,
    error: state.cartReducer.error,
  };
};

const mapDispatchToProps = dispatch => ({
  purchaseBooksCT: books => dispatch(purchaseBooks(books)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
