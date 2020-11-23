import React from "react";
import "./Article.css";
import { SectionUnderline } from "../../StyledComponents/Headers";
import { PostContainer } from "../../StyledComponents/Container";
import UserManager from "../../Utils";

const ArticleHeader = (props) => {
  const { blog, link } = props;
  return (
    <div className="PostHeader">
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

const Article = (props) => {
  const { blog } = props;
  return (
    <div>
      <div className="ArticleContainer">
        <div className="DateContainer">
          <div className="DatePointContainer">
            <div className="PointContainer"></div>
            <span className="date-day">{blog.day}</span>
            <span className="date-month">{blog.month}</span>
          </div>
        </div>

        <PostContainer top={props.top}>
          <span className="DateContainerMob">
            {blog.month} {blog.day}, {blog.year}
          </span>
          {UserManager.isLoggedin() &&
          blog.authorId == UserManager.getUserId() ? (
            <ArticleHeader blog={blog} link={`new-story/${blog.post_id}`} />
          ) : (
            <ArticleHeader blog={blog} link={`post/${blog.post_id}`} />
          )}

          <div className="PostContent">
            <p>{blog.summary}</p>
          </div>
        </PostContainer>
      </div>
      <SectionUnderline />
    </div>
  );
};

export default Article;
