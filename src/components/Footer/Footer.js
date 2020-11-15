import React, { Component } from "react";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <h2>Logo</h2>
        <p className="FooterBottomText">
          Created by Meks · Powered by React <br /> All rights reserved
        </p>
      </div>
    );
  }
}
