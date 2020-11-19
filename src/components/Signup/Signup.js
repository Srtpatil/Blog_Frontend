import "./Signup.css";
import React, { Component } from "react";
import Title from "../Title/Title";
import Navbar from "../Navbar/Navbar";
import SignupForm from "../Forms/SignupForm";
import UserManager from "../../Utils";

class Signup extends Component {
  render() {
    if (UserManager.isLoggedin()) {
      return <div>Already Logged in</div>;
    }
    return (
      <div>
        <Navbar />
        <Title />
        <div className="backgroundBox">
          <div className="mainContainer2">
            {/* First image Section */}
            <section class="imageWrapper">
              <div class="imageMessage">
                <div class="imageText">
                  <h2>Start your journey now</h2>
                  <p>
                    Start create your amazing Content with us! Sign up today and
                    start writing.
                  </p>
                </div>
              </div>
            </section>
            {/* Second Form Section */}
            <section className="formWrapper">
              <SignupForm />
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
