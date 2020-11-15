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
        {this.props.title ? (
          <div className="TitleNameContainer">
            <h1 className="TitleText">{this.props.title}</h1>

            {this.props.author ? (
              <div className="AuthorContainer">
                <p className="AuthorText">By {this.props.author}</p>
              </div>
            ) : null}

            {this.props.divider ? <Divider /> : null}

            {/* Read and read later buttons */}

            {!this.props.homepage ? (
              <div className="ReadContainer">
                <div
                  className="ReadButton"
                  onClick={() => {
                    this.props.onreadClick();
                  }}
                >
                  <p>Read On</p>
                </div>
                <div className="ReadLaterButton">
                  <p>Read Later</p>
                </div>
              </div>
            ) : null}

            <div className="TitleTextBackground">
              <p className="firstLetterBackground">{this.firstLetter}</p>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Title;
