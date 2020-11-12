import React, { Component } from "react";
import Divider from "../Divider/Divider";
import "./Title.css";

class Title extends Component {
  constructor(props) {
    super(props);

    this.firstLetter = this.props.title ? this.props.title[0] : null;
  }
  render() {
    return (
      <div className="TitleContainer">
        <div className="TitleNameContainer">
          <h1 className="TitleText">
            {this.props.title ? this.props.title : null}
          </h1>

          <div className="AuthorContainer">
            {this.props.author ? (
              <p className="AuthorText">By {this.props.author}</p>
            ) : null}
          </div>

          {this.props.divider ? <Divider /> : null}

          {/* Read and read later buttons */}

          {!this.props.homepage ? (
            <div className="ReadContainer">
              <div className="ReadButton">
                <p>Read On</p>
              </div>
              <div className="ReadLaterButton">
                <p>Read Later</p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="TitleTextBackground"><p style={{
        }}>{this.firstLetter}</p></div>
      </div>
    );
  }
}

export default Title;
