import React from "react";
import { Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, render, access, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
