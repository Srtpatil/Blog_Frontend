import "./Title.css";
import React, { Component } from "react";
import Divider from "../Divider/Divider";
import { PrimaryButton, SecondaryButton } from "../../StyledComponents/Buttons";
import { TitleContainer } from "../../StyledComponents/Container";
class Title extends Component {
  constructor(props) {
    super(props);
    this.firstLetter = this.props.title ? this.props.title[0] : null;
  }
  render() {
    return (
      <TitleContainer top={this.props.top}>
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

            {this.props.addButton ? (
              <div className="ReadContainer">
                {/* <div
                  className="ReadButton"
                  onClick={() => {
                    this.props.onreadClick();
                  }}
                >
                  <p>Read On</p>
                </div>
                <div className="ReadLaterButton">
                  <p>Read Later</p>
                </div> */}
                <PrimaryButton
                  onClick={() => {
                    this.props.onPrimaryClick();
                  }}
                >
                  {this.props.red_button}
                </PrimaryButton>
                <SecondaryButton>{this.props.white_button}</SecondaryButton>
              </div>
            ) : null}

            <div className="TitleTextBackground">
              <p className="firstLetterBackground">
                {this.props.firstLetter
                  ? this.props.firstLetter.toUpperCase()
                  : this.firstLetter}
              </p>
            </div>
          </div>
        ) : null}
      </TitleContainer>
    );
  }
}

export default Title;
