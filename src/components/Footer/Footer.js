import React, { Component } from "react";
import classnames from "classnames";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <footer
        className={classnames("Footer", {
          "sticky--footer": this.props.stickyFooter,
        })}
      >
        Made With React
      </footer>
    );
  }
}
