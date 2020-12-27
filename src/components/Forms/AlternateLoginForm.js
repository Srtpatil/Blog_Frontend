import React, { Component } from "react";
import "./AlternateLoginForm.css";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { API_DEV } from "../../Utils";
import { LoginButton } from "../../StyledComponents/Buttons";

const facebookLoginUrl = `${API_DEV}auth/facebook`;
const googleLoginUrl = `${API_DEV}auth/google`;
const githubLoginUrl = `${API_DEV}auth/github`;

class AlternateLoginForm extends Component {
  onEvent = (loginUrl) => {
    window.open(loginUrl, "_self");
  };

  render() {
    return (
      <div className="formContainer">
        {/* Form Message  */}
        <div class="formMessages">
          <h2>Login</h2>
          <p>Welcome! Please, login using any of your accounts!</p>
        </div>

        <div className="AlternateButtonContainer">
          <LoginButton
            border
            onClick={() => {
              this.onEvent(googleLoginUrl);
            }}
          >
            <span className="svgIcon">
              <svg width="25" height="37" viewBox="0 0 25 25">
                <g fill="none" fill-rule="evenodd">
                  <path
                    d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                    fill="#34A853"
                  />
                  <path
                    d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                    fill="#EA4335"
                  />
                </g>
              </svg>
            </span>
            <span>Sign in with Google</span>
          </LoginButton>

          {/* FACEBOOK LOGIN BUTTON */}
          <LoginButton
            color="white"
            backgroundColor="#3b5998"
            onClick={() => {
              this.onEvent(facebookLoginUrl);
            }}
          >
            <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
            <span
              style={{
                paddingLeft: "8px",
              }}
            >
              Sign in with Facebook
            </span>
          </LoginButton>

          {/* Github LOGIN BUTTON */}
          <LoginButton
            color="white"
            backgroundColor="#0f1619"
            onClick={() => {
              this.onEvent(githubLoginUrl);
            }}
          >
            <FontAwesomeIcon
              icon={faGithub}
              size="2x"
              style={{
                color: "#fff",
              }}
            />
            <span
              style={{
                paddingLeft: "8px",
              }}
            >
              Sign in with Github
            </span>
          </LoginButton>
        </div>
      </div>
    );
  }
}

export default AlternateLoginForm;
