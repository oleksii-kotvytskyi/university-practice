import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getAuthentificated } from "../../redux/sign-in/reducer";

type PrivateComponentProps = {
  component: typeof React.Component;
  isAuth: boolean;
  [key: string]: any; // my be any of type
};

const PrivateComponent = (props: PrivateComponentProps) => {
  const { component: Component, isAuth, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(compProps) =>
        isAuth ? <Component {...compProps} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default connect((state) => ({
  isAuth: getAuthentificated(state),
}))(PrivateComponent);
