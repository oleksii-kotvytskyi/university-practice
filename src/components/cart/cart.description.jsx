import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCountPriceBookIcCart } from "../../redux/cart/reducer";

const CartDescription = ({ booksInCart, totalPrice }) => {
  return (
    <>
      <div className="container-fluid d-flex justify-content-center col-6 mt-5">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Count</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {booksInCart.map((book) => (
              <tr key={book.id}>
                <td className="table-active">{book.title}</td>
                <td className="table-active">{book.count}</td>
                <td className="table-active">${book.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center font-weight-bold">
        Total Price ${totalPrice.toFixed(2)}
      </div>
    </>
  );
};

CartDescription.propTypes = {
  booksInCart: PropTypes.oneOfType([PropTypes.array]).isRequired,
  totalPrice: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    booksInCart: state.cartReducer.books,
    totalPrice: getCountPriceBookIcCart(state),
  };
};

export default connect(mapStateToProps)(CartDescription);
