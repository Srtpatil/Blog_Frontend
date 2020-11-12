import React, { Component } from "react";
import { PostData } from "../../DummyData/Post";
import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import "./Post.css";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./constants";

class Post extends Component {
  render() {
    return (
      <>
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
              readOnly={true}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Post;
