import "./Editor.css";
import React, { Component } from "react";
import Content from "../Content/Content";
import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import EditorJS from "react-editor-js";
import ContentEditable from "react-contenteditable";
import Footer from "../Footer/Footer";
import { PostData } from "../../DummyData/Post";
import UserManager, { API_DEV, NotificationManager } from "../../Utils";
import ReactNotification, { store } from "react-notifications-component";
import { EDITOR_JS_TOOLS } from "../Post/constants";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { diffString, diff } from "json-diff";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      firstLetter: "W",
      blog: null,
      empty: false,
      loading: true,
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora incidunt quas reprehenderit corporis amet nesciunt, a alias asperiores? Atque excepturi eum, similique officiis veniam consequuntur tempora, numquam in repudiandae assumenda quos vitae, dicta delectus. Molestiae fuga eaque temporibus labore, assumenda veritatis impedit quam magnam pariatur, totam eius, officiis numquam! Molestiae, eveniet quae recusandae aut a, qui maxime magnam iure, asperiores similique dolorem. Ea, officiis voluptatum quae quidem aliquam tempora doloribus odio nesciunt libero dicta fuga dolor. Alias officia laborum id!",
      is_published: false,
      is_drafted: false,
      disabled: false,
      primaryButtonText: "Publish",
      secondaryButtonText: "Save as a Draft",
      authorName: "Anonymous",
    };
    this.contentEditable = React.createRef();
  }

  componentDidMount() {
    this.post_id = this.props.match.params.post_id;

    if (!this.post_id) {
      this.setState({
        empty: true,
        loading: false,
      });
    } else {
      fetch(`${API_DEV}post/${this.post_id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          // "Access-Control-Allow-Credentials": true,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          let primaryButtonText = this.state.primaryButtonText,
            secondaryButtonText = this.state.secondaryButtonText;
          if (data.post.is_published) {
            primaryButtonText = "Update Post";
          }

          if (data.post.is_drafted) {
            secondaryButtonText = "Update Draft";
          }

          this.setState({
            blog: data.post.content,
            title: data.post.title,
            loading: false,
            firstLetter: data.post.title[0],
            is_published: data.post.is_published,
            is_drafted: data.post.is_drafted,
            primaryButtonText: primaryButtonText,
            secondaryButtonText: secondaryButtonText,
            authorName: data.post.user.name,
          });
          console.log("Data from editor: ", data);
        })
        .catch((err) => {
          this.setState({
            loading: false,
          });
          this.props.history.replace("/not_found");
        });
    }
  }

  handleChange = (e) => {
    let newTitle = e.target.value;

    let newFirstLetter = e.target.value[0];
    // if (newTitle === "<br>") {
    //   // newTitle = "";
    //   newFirstLetter = null;
    // }

    // console.log(newTitle);
    this.setState({ title: newTitle, firstLetter: newFirstLetter });
  };

  getEditorContext = (api, newData) => {
    // console.log("API ", api);
    // console.log("Diff -> ", diff(this.state.blog["blocks"], newData["blocks"]));
    if (this.state.blog && this.state.blog["blocks"]) {
      if (newData["blocks"].length < this.state.blog["blocks"].length) {
        //deleted a block check if image was deleted\

        const DataDiff = diff(this.state.blog["blocks"], newData["blocks"]);
        for (let i = 0; i < DataDiff.length; i++) {
          if (DataDiff[i][0] === "-" && DataDiff[i][1].type === "image") {
            // console.log(DataDiff[i][1].data.file.url);
            const path = DataDiff[i][1].data.file.url;
            fetch(`http://localhost:5000/image/delete?path=${path}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((resp) => resp.json())
              .then((res) => console.log(res));
          }
        }
      }
    }

    this.setState({
      blog: newData,
    });

    console.log(newData);
  };

  updatePost = () => {
    const data = {
      title: this.state.title,
      content: this.state.blog,
      summary: this.state.summary,
      is_published: true,
      is_drafted: false,
    };

    fetch(`${API_DEV}post/edit/${this.post_id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          NotificationManager().add(
            "Post Updated Successfully",
            "success",
            "Success",
            1000
          );

          setTimeout(() => {
            this.props.history.push("/");
          }, 500);
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  publishPost = () => {
    const data = {
      title: this.state.title,
      content: this.state.blog,
      user_id: UserManager.getUserId(),
      is_published: true,
      is_drafted: false,
    };

    if (this.state.is_drafted) {
      this.updatePost();
    } else {
      fetch(`${API_DEV}post/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          // Authorization: "Bearer " + UserManager.getToken(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (!data.error) {
            NotificationManager().add(
              "Post Added Successfully",
              "success",
              "Success",
              1000
            );

            setTimeout(() => {
              this.props.history.push("/");
            }, 500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  publishDraft = () => {
    const data = {
      title: this.state.title,
      content: this.state.blog,
      user_id: UserManager.getUserId(),
      is_published: false,
      is_drafted: true,
    };

    if (this.state.is_published) {
      this.updateDraft();
    } else {
      console.log(data);
      fetch(`${API_DEV}post/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          // Authorization: "Bearer " + UserManager.getToken(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (!data.error) {
            NotificationManager().add(
              "Draft added Successfully",
              "success",
              "Success",
              1000
            );

            setTimeout(() => {
              this.props.history.push("/");
            }, 500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  updateDraft = () => {
    const data = {
      title: this.state.title,
      content: this.state.blog,
      summary: this.state.summary,
      is_published: false,
      is_drafted: true,
    };

    fetch(`${API_DEV}post/edit/${this.post_id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        // Authorization: "Bearer " + UserManager.getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          NotificationManager().add(
            "Draft Updated Successfully",
            "success",
            "Success",
            1000
          );

          setTimeout(() => {
            this.props.history.push("/");
          }, 500);
        }
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
      <textarea
        className="EditorTitleInputBox"
        placeholder="Write Title Here..."
        onChange={this.handleChange}
        maxLength="60"
      >
        {this.state.title}
      </textarea>
    );
    return (
      <div>
        <ReactNotification />
        <Navbar />
        <Title
          title={customTitle}
          author={this.state.authorName}
          addButton={true}
          red_button={this.state.primaryButtonText}
          white_button={this.state.secondaryButtonText}
          firstLetter={this.state.firstLetter}
          onPrimaryClick={
            this.state.is_published ? this.updatePost : this.publishPost
          }
          onSecondaryClick={
            this.state.is_drafted ? this.updateDraft : this.publishDraft
          }
        />
        <Content title="Write your Story!">
          <EditorJS
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
