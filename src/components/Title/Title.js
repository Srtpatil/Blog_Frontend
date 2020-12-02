import "./Title.css";
import React, { Component } from "react";
import { PrimaryButton, SecondaryButton } from "../../StyledComponents/Buttons";
import { TitleContainer } from "../../StyledComponents/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark as faSolidBookmark,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

class Title extends Component {
  constructor(props) {
    super(props);
    this.firstLetter = this.props.title
      ? this.props.quote
        ? this.props.title[1]
        : this.props.title[0]
      : null;
  }
  render() {
    return (
      <TitleContainer
        top={this.props.top}
        disableFullScreen={this.props.disableFullScreen}
      >
        {this.props.title ? (
          <div className="TitleNameContainer">
            <h1 className="TitleText">{this.props.title}</h1>

            {this.props.author ? (
              <div className="AuthorContainer">
                <p className="AuthorText">
                  {this.props.quote ? "-" : "By "} {this.props.author}
                </p>
              </div>
            ) : null}

            {/* Read and read later buttons */}

            {this.props.addButton ? (
              <div className="ReadContainer">
                <PrimaryButton
                  onClick={() => {
                    this.props.onPrimaryClick();
                  }}
                >
                  {this.props.red_button}
                </PrimaryButton>
                <SecondaryButton
                  border
                  onClick={() => this.props.onSecondaryClick()}
                >
                  {this.props.bookMarkLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    <>
                      {this.props.secondaryIcon ? (
                        <FontAwesomeIcon icon={this.props.secondaryIcon} />
                      ) : null}
                      {this.props.white_button}
                    </>
                  )}
                </SecondaryButton>
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
