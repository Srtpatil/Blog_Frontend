import React, { Component } from "react";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <div
        className="Footer"
        style={{
          bottom: this.props.bottom ? this.props.bottom : "30px",
        }}
      >
        <h2>Logo</h2>
        <p className="FooterBottomText">
          Powered by React <br /> All rights reserved
        </p>
      </div>
    );
  }
}
