import "./Login.css";
import React, { Component } from "react";
import Title from "../Title/Title";
import Navbar from "../Navbar/Navbar";
import UserManager from "../../Utils";
import LoginForm from "../Forms/LoginForm";
import AlternateLoginForm from "../Forms/AlternateLoginForm";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Footer from "../Footer/Footer";

class Login extends Component {
  render() {
    if (UserManager.isLoggedin()) {
      return <div>Already Logged in</div>;
    }
    return (
      <div>
        <ReactNotification />
        <Navbar />
        <Title />
        <div className="backgroundBox">
          <div className="mainContainer">
            {/* First Form Section */}
            <section className="formWrapper">
              <AlternateLoginForm props={this.props} />
            </section>
            {/* Second image Section */}
            <div className="imageWrapper">
              <div className="imageMessage">
                <div className="imageText">
                  <h2>Start your journey now</h2>
                  <p>
                    Start create your amazing Content with us! Login into your
                    account now and start writing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer bottom={1} />
      </div>
    );
  }
}

export default Login;
