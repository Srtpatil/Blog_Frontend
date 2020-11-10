import React, { Component } from "react";
import Divider from "../Divider/Divider";
import "./Title.css";

class Title extends Component {
  constructor(props) {
    super(props);

    this.firstLetter = this.props.title ? this.props.title[0] : null;
  }

  TitleContainerStyles = !this.props.homepage ? {} : { height: "65%" };

  render() {
    return (
      <div className="TitleContainer">
        <div className="TitleNameContainer" style={this.TitleContainerStyles}>
          <h1 className="TitleText">
            {this.props.title ? this.props.title : null}
          </h1>
          <div className="TitleTextBackground">{this.firstLetter}</div>
        </div>
        {this.props.divider ? <Divider /> : null}
        <div className="AuthorContainer">
          {this.props.author ? (
            <p className="AuthorText">By {this.props.author}</p>
          ) : null}
        </div>
        {!this.props.homepage ? (
          <div className="ReadContainer">
            <div className="ReadButton">
              <p>Read On</p>
            </div>
            <div
              className="ReadButton"
              style={{
                color: "white",
                backgroundColor: "#c62641",
                border: "1px solid white",
                zIndex: 0,
              }}
            >
              <p>Read Later</p>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Title;
