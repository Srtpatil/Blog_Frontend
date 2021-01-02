import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import UserManager from "../Utils";
import FullscreenLoader from "./Static_Pages/FullscreenLoader";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [authenticate, setAuthenticated] = useState("wait");

  useEffect(() => {
    UserManager.isLoggedinWithApi()
      .then((data) => {
        console.log("logged in status");
        if (!data.success) {
          UserManager.clear();
        }
        setAuthenticated(data.success);
      })
      .catch((err) => {
        UserManager.clear();
        setAuthenticated(false);
      });
  }, []);

  if (authenticate === "wait") {
    return <FullscreenLoader />;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        // console.log(props);
        if (authenticate) {
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
