import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Cart from "../../assets/images/cart.png";
import { getCountBooksInCart } from "../../redux/cart/reducer";
import { handleLogout } from "../../redux/sign-in/actions";
import { clearCartAfterLogOut } from "../../redux/cart/actions";

const Header = ({
  isAuthentificated,
  avatar,
  username,
  countBooksInCart,
  handleLogoutCT,
}) => {
  return (
    <div>
      <div className="bg-secondary border-bottom d-flex justify-content-around flex-wrap">
        {console.log(isAuthentificated)}
        <h1
          className={`h2 pt-4 pb-2 ${isAuthentificated ? "pl-5" : ""}`}
          style={{ color: "white" }}
        >
          Book store
        </h1>
        {isAuthentificated && (
          <ul className="header-nav-list">
            <li>
              <Link to="/books" style={{ textDecoration: "none" }}>
                <button type="button" className="btn btn-light">
                  Catalog
                </button>
                {/* <span className="nav-catalog">Catalog</span> */}
              </Link>
            </li>
            <li>
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <img
                  src={Cart}
                  alt="cart"
                  width="50"
                  height="50"
                  className="mt-3"
                />
                <div className="cart-countbooks">{countBooksInCart}</div>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleLogoutCT}
              >
                Sign Out
              </button>
            </li>
            <li>
              <img
                src={avatar}
                alt="avatar"
                width="50"
                height="50"
                className="rounded-circle"
              />
              <span className="ml-2">{username}</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

Header.defaultProps = {
  avatar: PropTypes.undefined,
  username: PropTypes.undefined,
};

Header.propTypes = {
  isAuthentificated: PropTypes.bool.isRequired,
  avatar: PropTypes.string,
  username: PropTypes.string,
  countBooksInCart: PropTypes.number.isRequired,
  handleLogoutCT: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthentificated: state.signInReducer.isAuthentificated,
    avatar: state.signInReducer.avatar,
    username: state.signInReducer.username,
    countBooksInCart: getCountBooksInCart(state),
  };
};

const mapDispatchToProps = (distaptch) => ({
  handleLogoutCT: () => {
    distaptch(handleLogout());
    distaptch(clearCartAfterLogOut());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
