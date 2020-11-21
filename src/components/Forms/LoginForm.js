import React, { Component } from "react";
import "./LoginForm.css";
import { Link, Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { API_DEV } from "../../Utils";
import * as Yup from "yup";
import { store } from "react-notifications-component";

class LoginForm extends Component {
  loginUser = (values) => {
    return fetch(`${API_DEV}user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
  };

  render() {
    return (
      <div className="formContainer">
        {/* Form Message  */}
        <div class="formMessages">
          <h2>Login</h2>
          <p>
            Welcome! Please, fill username and password to sign in into your
            account.
          </p>
        </div>

        {/* Main Login Form start */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(6, "Must be more than 6 characters")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            this.loginUser(values)
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                setSubmitting(false);
                if (data.error) {
                  //alert

                  store.addNotification({
                    title: "Error!",
                    message: data.error,
                    type: "warning",
                    insert: "top",
                    container: "top-right",
                    dismiss: {
                      duration: 3000,
                      onScreen: false,
                    },
                  });
                } else {
                  //save token
                  localStorage.setItem("authToken", data.token);
                  localStorage.setItem("user_id", data.user.user_id);

                  this.props.props.history.replace("/");
                }
              })
              .catch((err) => {
                setSubmitting(false);
                console.error(err);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <label className="emailLabel" htmlFor="email">
                Email :{" "}
              </label>
              <Field type="email" name="email" placeholder="Type your email" />
              <ErrorMessage
                name="email"
                component="div"
                className="errorMessage"
              />
              <label className="passwordLabel">Password : </label>
              <Field
                type="password"
                name="password"
                placeholder="Type your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="errorMessage"
              />
              <div className="formButtonsContainer">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="loginButton"
                >
                  Login
                </button>
                {/* <div className="loginButton">Login</div> */}
                <div className="signUpButton">
                  <Link to="/signup">Sign Up</Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        {/* Login Form end */}

        {/* Alternate Login Options */}
        <div class="loginOptions">
          <p class="loginOptionsText">You can also login with:</p>

          <div class="loginIcons">
            <a href="#">
              <FontAwesomeIcon
                icon={faFacebookSquare}
                size="2x"
                style={{
                  color: "#c62641",
                }}
              />
            </a>
            <a href="#">
              <FontAwesomeIcon
                icon={faGoogle}
                size="2x"
                style={{
                  color: "#c62641",
                }}
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
