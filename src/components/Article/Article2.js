import React from "react";
import "./Article2.css";
import { SectionUnderline } from "../../StyledComponents/Headers";
import UserManager from "../../Utils";
import { PrimaryButton, SecondaryButton } from "../../StyledComponents/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotificationManager, API_DEV } from "../../Utils";
import { Link, useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const secondButtonHandler = (blog, history) => {
  const post_id = blog.post_id;

  fetch(`${API_DEV}post/${post_id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + UserManager.getToken(),
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((res) => {
      if (!res.error) {
        NotificationManager().add(
          "Draft Removed Successfully",
          "success",
          "Success",
          1000
        );
        // let history = useHistory();
        setTimeout(() => {
          history.push("/");
        }, 500);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const Article2Header = (props) => {
  const { blog, link } = props;

  return (
    <div className="Post2Header">
      <span className="Post2HeaderFirstLetter">{blog.title[0]}</span>
      <Link to={link} className="PostLink">
        {blog.title}
      </Link>
      <p
        style={{
          color: "#aaaaaa",
          fontSize: "0.9rem",
        }}
      >
        By{" "}
        <Link to="#" className="AuthorLink">
          {blog.author}
        </Link>
      </p>
    </div>
  );
};

const Article2 = (props) => {
  const { blog } = props;
  let history = useHistory();

  return (
    <div>
      <div className="Article2Container">
        <span className="Date2ContainerMob">
          {blog.month} {blog.day}, {blog.year}
        </span>
        <div className="Post2Container">
          {UserManager.isLoggedin() &&
          blog.authorId == UserManager.getUserId() ? (
            <Article2Header blog={blog} link={`/new-story/${blog.post_id}`} />
          ) : (
            <Article2Header blog={blog} link={`/post/${blog.post_id}`} />
          )}
          <div className="Post2Content">
            <p>{blog.summary}</p>
          </div>

          <div className="ArticleButtonsContainer">
            <SecondaryButton
              as="a"
              href={
                UserManager.isLoggedin() &&
                blog.authorId == UserManager.getUserId()
                  ? `/new-story/${blog.post_id}`
                  : `/post/${blog.post_id}`
              }
            >
              {props.firstButtonContent}
            </SecondaryButton>
            <Popup
              trigger={
                <PrimaryButton border>
                  {props.secondButtonIcon ? (
                    <FontAwesomeIcon icon={props.secondButtonIcon} />
                  ) : null}
                  {props.secondButtonContent}
                </PrimaryButton>
              }
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
                  <div className="DeletePopupContent">
                    <p>
                      This action cannot be undone. This will permanently delete
                      your post.
                    </p>
                  </div>
                  <div className="ConfirmButtonContainer">
                    <SecondaryButton
                      border
                      onClick={() => {
                        secondButtonHandler(blog, history);
                      }}
                    >
                      {props.secondButtonIcon ? (
                        <FontAwesomeIcon icon={props.secondButtonIcon} />
                      ) : null}
                      {props.secondButtonContent}
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
            {/* <PrimaryButton
              // onClick={() => {
              //   secondButtonHandler(blog, history);
              // }}
              border
            >
              {props.secondButtonIcon ? (
                <FontAwesomeIcon icon={props.secondButtonIcon} />
              ) : null}
              {props.secondButtonContent}
            </PrimaryButton> */}
          </div>
        </div>
      </div>
      <SectionUnderline />
    </div>
  );
};

export default Article2;
