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
import { API_DEV } from "../../Utils";

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
      likesCount: null,
      PostData: null,
      loading: true,
    };

    this.myRef = React.createRef();
  }

  componentDidMount() {
    console.log(this.props.match);
    const post_id = this.props.match.params.post_id;

    fetch(`${API_DEV}post/${post_id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const postData = {
          Title: data.post.title,
          Author: data.post.user.name,
          Likes: data.post.likes,
          AuthorDescription: "Someome",
          PostContent: data.post.content,
          AuthorId: data.post.user_id,
        };
        this.setState({
          PostData: postData,
          likesCount: data.post.likes,
          loading: false,
        });
        console.log(data);
      });
  }

  executeScroll = () => {
    this.myRef.current.scrollIntoView();
  };

  render() {
    if (this.state.loading) {
      return <div>loading</div>;
    }
    return (
      <div>
        <Navbar />
        <Title
          addButton={true}
          red_button="Read On"
          white_button="Read Later"
          title={this.state.PostData.Title}
          author={this.state.PostData.Author}
          // refProp={this.myRef}
          onPrimaryClick={this.executeScroll}
        />
        <Content title="ENJOY YOUR READ !" refProp={this.myRef}>
          <EditorJs
            tools={EDITOR_JS_TOOLS}
            data={this.state.PostData.PostContent}
            readOnly={false}
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
                  {this.state.PostData.Author}
                </p>
              </div>
              <p className="AboutAuthorDescriptionText">
                {this.state.PostData.AuthorDescription}
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
              readOnly={false}
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
