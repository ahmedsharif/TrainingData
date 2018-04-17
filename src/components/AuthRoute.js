import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const isAuthenticated = () => Boolean(localStorage.authToken);

const PUBLIC_ROOT = '/login';
const HOME_ROOT = '/';

const AuthRoute = ({ component, ...props }) => {
  const { isPrivate } = component;
  if (isAuthenticated()) {
    if (props.path === PUBLIC_ROOT) {
      return <Redirect to={HOME_ROOT} />;
    }
    return <Route {...props} component={component} />;
  } else {
    if (isPrivate === true) {
      return <Redirect to={PUBLIC_ROOT} />;
    }
    return <Route {...props} component={component} />;
  }
};

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

export default AuthRoute;
