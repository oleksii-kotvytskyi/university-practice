import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAuthentificated } from '../../redux/sign-in/reducer';

const PrivateComponent = props => {
  const { component: Component, isAuth, ...rest } = props;
  return (
    <Route
      {...rest}
      render={compProps =>
        isAuth ? <Component {...compProps} /> : <Redirect to="/signin" />
      }
    />
  );
};

PrivateComponent.propTypes = {
  component: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default connect(state => ({
  isAuth: getAuthentificated(state),
}))(PrivateComponent);
