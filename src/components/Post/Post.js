import React, { Component } from "react";
import { PostData } from "../../DummyData/Post";
import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import "./Post.css";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./constants";
import Footer from "../Footer/Footer";
import { SocialButton, StyledLogo } from "../../StyledComponents/Buttons";
import {
  SectionHeader,
  SectionUnderline,
} from "../../StyledComponents/Headers";
import {
  faFacebookF,
  faRedditAlien,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Content from "../Content/Content";

const SharePost = () => {
  return (
    <>
      <SectionHeader>
        Share the post
        <SectionUnderline />
      </SectionHeader>
      <div className="SharePostContainer">
        <SocialButton
          width="28%"
          height="80%"
          background="#3E5B98"
          as="a"
          href="/login"
        >
          <FontAwesomeIcon
            icon={faFacebookF}
            size="2x"
            style={{
              color: "white",
            }}
          />
        </SocialButton>
        <SocialButton
          width="28%"
          height="80%"
          background="#4DA7DE"
          as="a"
          href="/login"
        >
          <FontAwesomeIcon
            icon={faTwitter}
            size="2x"
            style={{
              color: "white",
            }}
          />
        </SocialButton>
        <SocialButton
          width="28%"
          height="80%"
          background="#E74A1E"
          as="a"
          href="/login"
        >
          <FontAwesomeIcon
            icon={faRedditAlien}
            size="2x"
            style={{
              color: "white",
            }}
          />
        </SocialButton>
      </div>
    </>
  );
};

class Post extends Component {
  constructor() {
    super();
    this.state = {
      liked: false,
      likesCount: PostData.Likes,
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <Title
          addButton={true}
          red_button="Read On"
          white_button="Read Later"
          title={PostData.Title}
          author={PostData.Author}
        />
        <Content title="ENJOY YOUR READ !">
          <EditorJs
            tools={EDITOR_JS_TOOLS}
            data={PostData.PostContent}
            readOnly={true}
          />
          <SectionHeader marginTop="0px">
            Like the post
            <SectionUnderline />
          </SectionHeader>
          <div className="LikePostContainer">
            <StyledLogo
              isLiked={this.state.liked}
              onClick={() => {
                this.setState((prevState) => {
                  let cnt = prevState.likesCount;
                  if (prevState.liked) {
                    cnt--;
                  } else {
                    cnt++;
                  }
                  return {
                    liked: !prevState.liked,
                    likesCount: cnt,
                  };
                });
              }}
            />
            <span className="LikesText">{this.state.likesCount} Likes</span>
          </div>
          <SharePost />
          <SectionHeader>
            About the author
            <SectionUnderline />
          </SectionHeader>
          <div className="AboutAuthorContainer">
            <div className="AboutAuthorImageContainer">
              <div className="AboutAuthorImage"></div>
            </div>
            <div className="AboutAuthorDescription">
              <div className="AboutAuthorName">
                <p
                  style={{
                    marginBottom: "4px",
                  }}
                >
                  {PostData.Author}
                </p>
              </div>
              <p className="AboutAuthorDescriptionText">
                {PostData.AuthorDescription}
              </p>
            </div>
          </div>
        </Content>
        {/* <div className="SinglePostContainer">
          <div className="SinglePostContent">
            <SectionHeader>
              <p>ENJOY YOUR READ !</p>
              <SectionUnderline />
            </SectionHeader>
            <EditorJs
              tools={EDITOR_JS_TOOLS}
              data={PostData.PostContent}
              readOnly={true}
            />

            <SectionHeader marginTop="0px">
              Like the post
              <SectionUnderline />
            </SectionHeader>

            <div className="LikePostContainer">
              <StyledLogo
                isLiked={this.state.liked}
                onClick={() => {
                  this.setState((prevState) => {
                    let cnt = prevState.likesCount;
                    if (prevState.liked) {
                      cnt--;
                    } else {
                      cnt++;
                    }
                    return {
                      liked: !prevState.liked,
                      likesCount: cnt,
                    };
                  });
                }}
              />
              <span className="LikesText">{this.state.likesCount} Likes</span>
            </div>

            <SharePost />
            <SectionHeader>
              About the author
              <SectionUnderline />
            </SectionHeader>
            <div className="AboutAuthorContainer">
              <div className="AboutAuthorImageContainer">
                <div className="AboutAuthorImage"></div>
              </div>
              <div className="AboutAuthorDescription">
                <div className="AboutAuthorName">
                  <p
                    style={{
                      marginBottom: "4px",
                    }}
                  >
                    {PostData.Author}
                  </p>
                </div>
                <p className="AboutAuthorDescriptionText">
                  {PostData.AuthorDescription}
                </p>
              </div>
            </div>
          </div>

          <Footer />
        </div> */}
        <Footer />
      </div>
    );
  }
}

export default Post;
