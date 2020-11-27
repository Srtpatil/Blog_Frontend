import React from "react";
import "./Article2.css";
import { SectionUnderline } from "../../StyledComponents/Headers";
import UserManager from "../../Utils";
import { PrimaryButton, SecondaryButton } from "../../StyledComponents/Buttons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  return (
    <div>
      <div className="Article2Container">
        <span className="Date2ContainerMob">
          {blog.month} {blog.day}, {blog.year}
        </span>
        <div className="Post2Container">
          {UserManager.isLoggedin() &&
          blog.authorId == UserManager.getUserId() ? (
            <Article2Header blog={blog} link={`new-story/${blog.post_id}`} />
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
                  ? `new-story/${blog.post_id}`
                  : `post/${blog.post_id}`
              }
            >
              {props.firstButtonContent}
            </SecondaryButton>
            <PrimaryButton border>
              <FontAwesomeIcon icon={faBookmark} />
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
