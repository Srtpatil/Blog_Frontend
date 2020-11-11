import React, { Component } from "react";
import "./LoginForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faGoogle } from "@fortawesome/free-brands-svg-icons";
import * as Yup from "yup";

class LoginForm extends Component {
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
              .min(8, "Must be more than 8 characters")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));

              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <label className="emailLabel" htmlFor="email">Email : </label>
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
                <div className="signUpButton">Sign Up</div>
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
