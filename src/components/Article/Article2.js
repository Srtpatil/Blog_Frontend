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
                      This action<b> cannot</b> be undone. This will
                      <b> permanently delete</b> your {props.type}.
                    </p>
                  </div>
                  <div className="ConfirmButtonContainer">
                    <SecondaryButton border onClick={props.secondButtonHandler}>
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
          </div>
        </div>
      </div>
      <SectionUnderline />
    </div>
  );
};

export default Article2;
