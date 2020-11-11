import React, { Component } from "react";
import "./Content.css";
import Article from "./Article";

const blog = {
  title:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, similique!",

  day: "05",
  month: "NOVEMBER",
  year: "2020",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora incidunt quas reprehenderit corporis amet nesciunt, a alias asperiores? Atque excepturi eum, similique officiis veniam consequuntur tempora, numquam in repudiandae assumenda quos vitae, dicta delectus. Molestiae fuga eaque temporibus labore, assumenda veritatis impedit quam magnam pariatur, totam eius, officiis numquam! Molestiae, eveniet quae recusandae aut a, qui maxime magnam iure, asperiores similique dolorem. Ea, officiis voluptatum quae quidem aliquam tempora doloribus odio nesciunt libero dicta fuga dolor. Alias officia laborum id!",
  author: "Anonymous",
};
class Content extends Component {
  render() {
    return (
      <div className="ContentContainer">
        <div className="Main">
          <div className="TitleContentContainer">
            <p>LATEST STORIES</p>
            <hr className="TitleBorder" />
          </div>
          <Article blog={blog} />
          <Article blog={blog} />
          <Article blog={blog} />
          <Article blog={blog} />
          <Article blog={blog} />
        </div>
      </div>
    );
  }
}

export default Content;
