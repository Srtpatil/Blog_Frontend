import React from "react";
import "./Article2.css";
import { SectionUnderline } from "../../StyledComponents/Headers";
import UserManager from "../../Utils";

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
        <div className="Post2Container">
          <span className="Date2ContainerMob">
            {blog.month} {blog.day}, {blog.year}
          </span>
          {UserManager.isLoggedin() &&
          blog.authorId == UserManager.getUserId() ? (
            <Article2Header blog={blog} link={`new-story/${blog.post_id}`} />
          ) : (
            <Article2Header blog={blog} link={`post/${blog.post_id}`} />
          )}
          <div className="Post2Content">
            <p>{blog.summary}</p>
          </div>
        </div>
      </div>
      <SectionUnderline />
    </div>
  );
};

export default Article2;
