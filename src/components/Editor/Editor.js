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
import ReactNotification, { store } from "react-notifications-component";
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
      disabled: false,
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
    if (newTitle.length >= 75) {
      // newTitle = newTitle.slice(0, -1);
      return;
    }

    let newFirstLetter = e.target.value[0];
    if (newTitle === "<br>") {
      // newTitle = "";
      newFirstLetter = null;
    }

    console.log(newTitle);
    this.setState({ title: newTitle, firstLetter: newFirstLetter });
  };

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
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora incidunt quas reprehenderit corporis amet nesciunt, a alias asperiores? Atque excepturi eum, similique officiis veniam consequuntur tempora, numquam in repudiandae assumenda quos vitae, dicta delectus. Molestiae fuga eaque temporibus labore, assumenda veritatis impedit quam magnam pariatur, totam eius, officiis numquam! Molestiae, eveniet quae recusandae aut a, qui maxime magnam iure, asperiores similique dolorem. Ea, officiis voluptatum quae quidem aliquam tempora doloribus odio nesciunt libero dicta fuga dolor. Alias officia laborum id!",
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
        disabled={this.state.disabled}
        onChange={this.handleChange}
        // onFocus={this.handleFocus}
        // onBlur={this.handleBlur}
        tagName=""
      />
    );
    return (
      <div>
        <ReactNotification />
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
