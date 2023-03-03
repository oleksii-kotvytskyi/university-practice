import React from 'react';
import PropTypes from 'prop-types';

const PurchaseMessage = props => {
  const { message } = props;

  return (
    <div className="card text-center col-8 col-md-6 d-block ml-auto mr-auto mt-5 bg-light">
      <div className="card-body">
        <p className="card-text">{message}</p>
      </div>
    </div>
  );
};

PurchaseMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default PurchaseMessage;
