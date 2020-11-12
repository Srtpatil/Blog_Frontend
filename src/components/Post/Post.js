import React, { Component } from "react";
import { PostData } from "../../DummyData/Post";
import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import "./Post.css";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./constants";
import Footer from "../Footer/Footer";

class Post extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Title
          homepage={false}
          title={PostData.Title}
          author={PostData.Author}
        />
        <div className="SinglePostContainer">
          <div className="SinglePostContent">
            <div className="TitleContentContainer">
              <p>ENJOY YOUR READ !</p>
              <hr className="TitleBorder" />
            </div>
            <EditorJs
              tools={EDITOR_JS_TOOLS}
              data={PostData.PostContent}
              readOnly={false}
            />

            <div
              className="TitleContentContainer"
              style={{
                marginTop: 0,
              }}
            >
              <p>About the author</p>
              <hr className="TitleBorder" />
            </div>
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
        </div>
      </div>
    );
  }
}

export default Post;
