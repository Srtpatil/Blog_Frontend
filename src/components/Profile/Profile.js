import "./Profile.css";
import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import Content from "../Content/Content";
import Article from "../Article/Article";
import Article2 from "../Article/Article2";
import React, { Component } from "react";
import { PrimaryButton, SecondaryButton } from "../../StyledComponents/Buttons";
import {
  SectionHeader,
  SectionUnderline,
} from "../../StyledComponents/Headers";
import UserManager, {
  API_DEV,
  MonthList,
  NotificationManager,
} from "../../Utils";
import EmptyContent from "../Static_Pages/EmptyContent";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactNotification, { store } from "react-notifications-component";
import Popup from "reactjs-popup";
import EditProfileForm from "../Forms/EditProfileForm";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      description: "",
      content: [],
      page: 1,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.user_id !== this.props.match.params.user_id) {
      window.location.reload();
    }
  }

  componentDidMount() {
    const user_id = this.props.match.params.user_id;
    fetch(`${API_DEV}post/allPosts/${user_id}&${this.state.page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        let blogs = [];
        res.posts.forEach((post) => {
          const date = new Date(post.updatedAt);
          const blog = {
            post_id: post.post_id,
            title: post.title,
            summary: post.summary,
            day: date.getDate(),
            month: MonthList[date.getMonth()],
            year: date.getFullYear(),
            author: res.user.name,
            authorId: res.user.user_id,
            content: post.content,
          };

          blogs.push(
            <Article2
              blog={blog}
              type="Post"
              firstButtonContent="Read on"
              secondButtonContent="Delete"
              secondButtonIcon={faTrash}
              secondButtonHandler={() => this.secondButtonHandler(blog)}
              secondButtonVisible={
                this.props.match.params.user_id === UserManager.getUserId()
              }
            />
          );
        });

        this.setState({
          author: res.user.name,
          description: res.user.description
            ? res.user.description
            : "I get my inspiration from the fictional world. I'm a social geek. Completely exploit 24/365 catalysts for change whereas high standards in action items. Conveniently whiteboard multifunctional benefits without enabled leadership.",
          content: blogs,
        });
      })
      .catch((err) => console.log(err));
  }

  secondButtonHandler = (blog) => {
    const post_id = blog.post_id;
    fetch(`${API_DEV}post/${post_id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog.content),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((res) => {
        if (!res.error) {
          NotificationManager().add(
            "Post Deleted Successfully",
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
  };

  editProfileHandler = (values, close) => {
    const { name, bio } = values;
    this.setState(
      {
        author: name,
        description: bio,
      },
      () => {
        const user_id = UserManager.getUserId();
        const data = {
          name: this.state.author,
          description: this.state.description,
        };
        fetch(`${API_DEV}user/edit/${user_id}`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((resp) => resp.json())
          .then((res) => {
            if (!res.error) {
              NotificationManager().add(
                "Profile Updated Successfully",
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
    );
  };

  render() {
    return (
      <div>
        <ReactNotification />
        <Navbar />
        <Title top="25vh" disableFullScreen={true} />
        <Content>
          <div className="authorContainer">
            <div className="authorImage"></div>
            <SectionHeader marginTop="40px">
              <h3
                style={{
                  lineHeight: 1.2,
                  fontSize: "18px",
                }}
              >
                AUTHOR &sdot; {this.state.author}
              </h3>
            </SectionHeader>
            {UserManager.isLoggedin &&
            UserManager.getUserId() === this.props.match.params.user_id ? (
              <Popup
                trigger={<PrimaryButton border>Edit Profile</PrimaryButton>}
                modal
                nested
              >
                {(close) => (
                  <div className="DeletePopup">
                    <button className="DeletePopupCloseBtn" onClick={close}>
                      &times;
                    </button>
                    <div className="DeletePopupHeader">
                      Are you absolutely sure ?
                    </div>

                    <EditProfileForm
                      profile={this.state}
                      onClose={close}
                      onSubmit={(values) =>
                        this.editProfileHandler(values, close)
                      }
                    />
                  </div>
                )}
              </Popup>
            ) : null}
            <SectionUnderline />
            <div className="authorDiscription">{this.state.description}</div>
          </div>
          <SectionHeader>{this.state.author}'s posts</SectionHeader>
          <SectionUnderline />
          {this.state.content.length ? this.state.content : <EmptyContent />}
        </Content>
      </div>
    );
  }
}

export default Profile;
