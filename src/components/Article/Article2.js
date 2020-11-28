import React from "react";
import "./Article2.css";
import { SectionUnderline } from "../../StyledComponents/Headers";
import UserManager from "../../Utils";
import { PrimaryButton, SecondaryButton } from "../../StyledComponents/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotificationManager, API_DEV } from "../../Utils";
import { useHistory } from "react-router-dom";

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
      <a href={link} className="PostLink">
        {blog.title}
      </a>
      <p
        style={{
          color: "#aaaaaa",
          fontSize: "0.9rem",
        }}
      >
        By{" "}
        <a href="#" className="AuthorLink">
          {blog.author}
        </a>
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
            <Article2Header
              blog={blog}
              link={`http://localhost:8887/new-story/${blog.post_id}`}
            />
          ) : (
            <Article2Header blog={blog} link={`post/${blog.post_id}`} />
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
                  ? `http://localhost:8887/new-story/${blog.post_id}`
                  : `http://localhost:8887/post/${blog.post_id}`
              }
            >
              {props.firstButtonContent}
            </SecondaryButton>
            <PrimaryButton
              onClick={() => secondButtonHandler(blog, history)}
              border
            >
              {props.secondButtonIcon ? (
                <FontAwesomeIcon icon={props.secondButtonIcon} />
              ) : null}
              {props.secondButtonContent}
            </PrimaryButton>
          </div>
        </div>
      </div>
      <SectionUnderline />
    </div>
  );
};

export default Article2;
