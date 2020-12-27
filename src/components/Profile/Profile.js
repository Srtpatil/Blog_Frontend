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
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
// import { FiEdit2 } from "react-icons/fi";
import { RiEditLine } from "react-icons/ri";
import ReactNotification, { store } from "react-notifications-component";
import Popup from "reactjs-popup";
import EditProfileForm from "../Forms/EditProfileForm";
import { faEbay } from "@fortawesome/free-brands-svg-icons";
import { ImageContainer } from "../../StyledComponents/Container";
import DefaultPicture from "../../assets/default-profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      description: "",
      content: [],
      page: 1,
      profile_picture: DefaultPicture,
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
          profile_picture: res.user.profilePicPath
            ? res.user.profilePicPath
            : DefaultPicture,
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
        profilePicPath:
          this.state.profile_picture === DefaultPicture
            ? null
            : this.state.profile_picture,
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

  uploadPictureHandler = (event) => {
    console.log("IMG: ", event.target.files);
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      const img = new FormData();
      img.append("image", file);
      if (this.state.profile_picture !== DefaultPicture) {
        fetch(
          `http://localhost:5000/image/delete?path=${this.state.profile_picture}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((resp) => resp.json())
          .then((res) => {
            console.log("First Delete: ", res);
            fetch("http://localhost:5000/image/upload", {
              method: "POST",
              credentials: "include",
              body: img,
            })
              .then((resp) => resp.json())
              .then((resp) => {
                console.log("Second Upload: ", resp);
                const user_id = UserManager.getUserId();
                const data = {
                  author: this.state.author,
                  description: this.state.description,
                  profilePicPath: resp.imagePath,
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
                      console.log("Third Update: ", res);
                      this.setState(
                        {
                          profile_picture: resp.imagePath,
                        },
                        () => {
                          NotificationManager().add(
                            "Picture Uploaded Successfully",
                            "success",
                            "Success",
                            1000
                          );
                        }
                      );
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
          });
      } else {
        fetch("http://localhost:5000/image/upload", {
          method: "POST",
          credentials: "include",
          body: img,
        })
          .then((resp) => resp.json())
          .then((resp) => {
            console.log("Second Upload: ", resp);
            const user_id = UserManager.getUserId();
            const data = {
              author: this.state.author,
              description: this.state.description,
              profilePicPath: resp.imagePath,
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
                  console.log("Third Update: ", res);
                  this.setState(
                    {
                      profile_picture: resp.imagePath,
                    },
                    () => {
                      NotificationManager().add(
                        "Picture Uploaded Successfully",
                        "success",
                        "Success",
                        1000
                      );
                    }
                  );
                }
              })
              .catch((err) => {
                console.log(err);
              });
          });
      }
    }
  };

  removePictureHandler = (close) => {
    if (this.state.profile_picture !== DefaultPicture) {
      fetch(
        `http://localhost:5000/image/delete?path=${this.state.profile_picture}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((resp) => resp.json())
        .then((res) => {
          console.log("DELETE DP: ", res);
          this.setState(
            {
              profile_picture: DefaultPicture,
            },
            () => {
              close();
              const user_id = UserManager.getUserId();
              const data = {
                author: this.state.author,
                description: this.state.description,
                profilePicPath: null,
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
                    console.log("Third Update: ", res);
                    NotificationManager().add(
                      "Picture Remove Successfully",
                      "success",
                      "Success",
                      1000
                    );
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          );
        });
    } else {
      NotificationManager().add(
        "No profile picture to delete",
        "warning",
        "Error",
        1000
      );
      close();
    }
  };

  render() {
    return (
      <div>
        <ReactNotification />
        <Navbar />
        <Title top="25vh" disableFullScreen={true} />
        <Content>
          <div className="authorContainer">
            <div className="ImageUploadContainer">
              {UserManager.isLoggedin() &&
              UserManager.getUserId() === this.props.match.params.user_id ? (
                <div>
                  <div class="dropdown">
                    <button class="dropbtn">
                      <RiEditLine size={25} />
                    </button>
                    <div class="dropdown-content">
                      <label htmlFor="upload">Upload</label>
                      <Popup trigger={<a dis>Remove</a>} modal nested>
                        {(close) => (
                          <div className="DeletePopup">
                            <button
                              className="DeletePopupCloseBtn"
                              onClick={close}
                            >
                              &times;
                            </button>
                            <div className="DeletePopupHeader">
                              Are you absolutely sure ?
                            </div>
                            <div className="DeletePopupContent">
                              <p>
                                This action<b> cannot</b> be undone. This will
                                <b> permanently delete</b> your Picture.
                              </p>
                            </div>
                            <div className="ConfirmButtonContainer">
                              <SecondaryButton
                                border
                                onClick={() => this.removePictureHandler(close)}
                              >
                                Remove
                              </SecondaryButton>
                              <PrimaryButton
                                border
                                onClick={() => {
                                  close();
                                }}
                              >
                                Close
                              </PrimaryButton>
                            </div>
                          </div>
                        )}
                      </Popup>
                    </div>
                  </div>
                  <input
                    type="file"
                    id="upload"
                    onChange={this.uploadPictureHandler}
                  />
                </div>
              ) : null}
              <img src={this.state.profile_picture} />
            </div>

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
            {UserManager.isLoggedin() &&
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
