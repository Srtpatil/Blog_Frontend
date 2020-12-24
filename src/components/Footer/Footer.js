import React, { Component } from "react";
import "./Footer.css";
import { ReactComponent as OptimizeItLogo } from "../../assets/Logo_Alt.svg";
export default class Footer extends Component {
  render() {
    return (
      <div
        className="Footer"
        style={{
          bottom: this.props.bottom ? this.props.bottom : "30px",
        }}
      >
        <OptimizeItLogo />
        <p className="FooterBottomText">
          Powered by React <br /> All rights reserved
        </p>
      </div>
    );
  }
}