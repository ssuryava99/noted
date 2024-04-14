
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AccessProvider } from './AccessProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { accessToken } = useContext(AccessProvider);

  return (
    <Route
      {...rest}
      render={(props) =>
        accessToken ? (
          <Component {...props} />
        ) : (
          <Navigate
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;