import React from "react";
import "./Article.css";

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

        <div className="PostContainer">
          <span className="DateContainerMob">
            {blog.month} {blog.day}, {blog.year}
          </span>
          <div className="PostHeader">
            <a href="#" className="PostLink">
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
          <div className="PostContent">
            <p>{blog.content}</p>
          </div>
        </div>
      </div>
      <hr className="TitleBorder" />
    </div>
  );
};

export default Article;
