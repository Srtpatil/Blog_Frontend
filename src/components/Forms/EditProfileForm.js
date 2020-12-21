import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./EditProfileForm.css";
import { PrimaryButton, SecondaryButton } from "../../StyledComponents/Buttons";

class EditProfileForm extends Component {
  render() {
    return (
      <div className="DeletePopupContent">
        <Formik
          initialValues={{
            name: this.props.profile.author,
            username: this.props.profile.username,
            bio: this.props.profile.description,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Required"),
            username: Yup.string().required("Required"),
            bio: Yup.string().required("Required"),
          })}
          onSubmit={(values) => {
            this.props.onSubmit(values, this.props.onClose);
          }}
        >
          <Form className="form">
            <label className="nameLabel">Name : </label>
            <Field type="text" name="name" placeholder="Type your Name" />
            {/* <ErrorMessage
              name="name"
              component="div"
              className="errorMessage"
            /> */}
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
            <label className="nameLabel">Bio : </label>
            <Field
              as="textarea"
              name="bio"
              placeholder="Tell us about yourself"
            />
            <ErrorMessage
              name="bio"
              component="div"
              className="errorMessage"
            />
            <div className="submitButtonContainer">
              <button
                type="submit"
                // disabled={isSubmitting}
                className="saveButton"
              >
                Save
              </button>
              <PrimaryButton
                border
                onClick={() => {
                  this.props.onClose();
                }}
              >
                Back
              </PrimaryButton>
            </div>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default EditProfileForm;
