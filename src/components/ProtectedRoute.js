import React from "react";
import { Route, Redirect } from "react-router-dom";
import UserManager from "../Utils";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(props);
        if (UserManager.isLoggedin()) {
          if (
            props.location.pathname === "/login" ||
            props.location.pathname === "/signup"
          ) {
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }

          return <Component {...rest} {...props} />;
        } else {
          if (
            props.location.pathname === "/login" ||
            props.location.pathname === "/signup"
          ) {
            return <Component {...rest} {...props} />;
          }

          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
