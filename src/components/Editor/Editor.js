import "./Editor.css";
import React, { Component } from "react";
import Content from "../Content/Content";
import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import EditorJS from "react-editor-js";
import ContentEditable from "react-contenteditable";
import Footer from "../Footer/Footer";
import { PostData } from "../../DummyData/Post";
import UserManager, { API_DEV } from "../../Utils";
import { EDITOR_JS_TOOLS } from "../Post/constants";
class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Write title here..",
      firstLetter: "W",
      blog: null,
      empty: false,
      loading: true,
      is_published: false,
      is_drafted: false,
    };
    this.contentEditable = React.createRef();
  }

  componentDidMount() {
    console.log(this.props.match);
    const post_id = this.props.match.params.post_id;

    if (!post_id) {
      this.setState({
        empty: true,
        loading: false,
      });
    } else {
      fetch(`${API_DEV}post/${post_id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.setState({
            blog: data.post.content,
            title: data.post.title,
            loading: false,
            firstLetter: data.post.title[0],
            is_published: data.post.is_published,
          });
          console.log(data);
        });
    }
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
    this.setState({
      blog: newData,
    });

    console.log(newData);
  };

  publishPost = () => {
    const data = {
      title: this.state.title,
      content: this.state.blog,
      summary: "",
      is_published: true,
      user_id: UserManager.getUserId(),
    };

    fetch(`${API_DEV}post/add`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + UserManager.getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (this.state.loading) {
      return <div>loading</div>;
    }
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
          red_button="Publish"
          white_button="Save as a Draft"
          firstLetter={this.state.firstLetter}
          onPrimaryClick={this.publishPost}
        />
        <Content title="Write your Story!">
          <EditorJS
            // hideToolbar={false}
            // inlineToolbar={true}
            tools={EDITOR_JS_TOOLS}
            onChange={this.getEditorContext}
            placeholder={this.state.empty ? "Start Writing Here" : null}
            data={this.state.blog}
          />
        </Content>
        <Footer />
      </div>
    );
  }
}

export default Editor;
