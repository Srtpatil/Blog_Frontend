import "./SignupForm.css";
import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { API_DEV } from "../../Constants";
import * as Yup from "yup";

class SignupForm extends Component {
  postData = (values) => {
    const data = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
    };
    return fetch(`${API_DEV}user/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  render() {
    return (
      <div className="formContainer">
        {/* Form Message  */}
        <div class="formMessages">
          <h2>Create Your Account</h2>
          <p>Welcome! Please, fill the details to create new account..</p>
        </div>

        {/* Main Signup Form start */}
        <Formik
          initialValues={{
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Required"),
            username: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(6, "Must be more than 8 characters")
              .required("Required"),
            confirmPassword: Yup.string().when("password", {
              is: (password) =>
                password && password.length > 0 ? true : false,
              then: Yup.string()
                .oneOf([Yup.ref("password")], "Password Doesn't match")
                .required("Required"),
            }),
          })}
          onSubmit={(values, { setSubmitting }) => {
            // setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            this.postData(values)
              .then((res) => {
                setSubmitting(false);
                console.log(res);
              })
              .catch((err) => {
                setSubmitting(false);
                console.error(err);
              });
            // setSubmitting(false);
            // }, 900);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <label className="nameLabel">Name : </label>
              <Field type="text" name="name" placeholder="Type your Name" />
              <label className="nameLabel">Username : </label>
              <Field
                type="text"
                name="username"
                placeholder="Type your username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="errorMessage"
              />
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
              <label className="passwordLabel">Confirm Password : </label>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Type your password again"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="errorMessage"
              />
              <div className="formButtonsContainer">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="signUpButton"
                >
                  Sign Up
                </button>
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

export default SignupForm;
