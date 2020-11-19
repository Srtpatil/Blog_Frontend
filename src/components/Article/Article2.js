import React from "react";
import "./Article2.css";
import { SectionUnderline } from "../../StyledComponents/Headers";

const Article2 = (props) => {
  const { blog } = props;
  return (
    <div>
      <div className="Article2Container">
        <div className="Post2Container">
          <span className="DateContainerMob">
            {blog.month} {blog.day}, {blog.year}
          </span>
          <div className="Post2Header">
            <span className="Post2HeaderFirstLetter">{blog.title[0]}</span>
            <a href="#" className="PostLink">
              {blog.title}
            </a>
            <p
              style={{
                color: "#aaaaaa",
              }}
            >
              By {" "}
              <a href="#" className="AuthorLink">
                {blog.author}
              </a>
            </p>
          </div>
          <div className="Post2Content">
            <p>{blog.content}</p>
          </div>
        </div>
      </div>
      <SectionUnderline />
    </div>
  );
};

export default Article2;
