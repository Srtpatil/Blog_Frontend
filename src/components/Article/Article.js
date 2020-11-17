import React from "react";
import "./Article.css";
import { SectionUnderline } from "../../StyledComponents/Headers";
import { PostContainer } from "../../StyledComponents/Container";

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
        </PostContainer>
      </div>
      <SectionUnderline />
    </div>
  );
};

export default Article;
