import "./Editor.css";
import React, { Component } from "react";
import Content from "../Content/Content";
import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import EditorJS from "react-editor-js";
import ContentEditable from "react-contenteditable";
import Footer from "../Footer/Footer";
import { PostData } from "../../DummyData/Post";
import { EDITOR_JS_TOOLS } from "../Post/constants";
class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Write title here..",
      firstLetter: "W",
      blog: null,
    };
    this.contentEditable = React.createRef();
  }

  handleChange = (e) => {
    let newTitle = e.target.value;
    let newFirstLetter = e.target.value[0];
    if (newTitle === "<br>") {
      // newTitle = "";
      newFirstLetter = null;
    }
    this.setState({ title: newTitle, firstLetter: newFirstLetter });
  };

  // handleBlur = () => {
  //   console.log(this.contentEditable.current.innerHTML);
  // };

  getEditorContext = (api, newData) => {
    // this.setState({
    //   blog:
    // })
    console.log(newData);
  };

  render() {
    const customTitle = (
      <ContentEditable
        className="editable"
        html={this.state.title}
        innerRef={this.contentEditable}
        disabled={false}
        onChange={this.handleChange}
        // onFocus={this.handleFocus}
        // onBlur={this.handleBlur}
        tagName=""
      />
    );
    return (
      <div>
        <Navbar />
        <Title
          title={customTitle}
          author="Anonymous"
          addButton={true}
          red_button="Save Draft"
          white_button="Published"
          firstLetter={this.state.firstLetter}
        />
        <Content title="Write your Story!">
          <EditorJS
            // hideToolbar={false}
            // inlineToolbar={true}
            tools={EDITOR_JS_TOOLS}
            onChange={this.getEditorContext}
            placeholder="Start Writing !"
            // data={PostData.PostContent}
          />
        </Content>
        <Footer />
      </div>
    );
  }
}

export default Editor;
