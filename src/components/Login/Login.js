import "./Login.css";
import React, { Component } from "react";
import Title from "../Title/Title";
import Navbar from "../Navbar/Navbar";
import LoginForm from "../Forms/LoginForm";

class Login extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Title homepage={true} divider={false} />
        <div className="backgroundBox">
          <div className="mainContainer">
            {/* First Form Section */}
            <section className="formWrapper">
              <LoginForm />
            </section>
            {/* Second image Section */}
            <section class="imageWrapper">
              <div class="imageMessage">
                <div class="imageText">
                  <h2>Start your journey now</h2>
                  <p>
                    Start create your amazing Content with us! Login into your
                    account now and start writing.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
