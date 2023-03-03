import React from 'react';
import CartIMG from '../../assets/images/cart.png';

const CartIsEmpty = () => {
  return (
    <div className="card text-center col-8 col-md-6 d-block ml-auto mr-auto mt-5 bg-light">
      <img src={CartIMG} alt="Card cap" className="d-block m-auto col-12 col-md-6" />
      <div className="card-body">
        <p className="card-text">Cart Empty...</p>
      </div>
    </div>
  );
};

export default CartIsEmpty;
