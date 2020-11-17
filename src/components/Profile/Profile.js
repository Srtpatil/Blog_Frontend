import "./Profile.css";
import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import Content from "../Content/Content";
import Article from "../Article/Article";
import React, { Component } from "react";
import { PrimaryButton, SecondaryButton } from "../../StyledComponents/Buttons";
import {
  SectionHeader,
  SectionUnderline,
} from "../../StyledComponents/Headers";

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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "Madison Barnett",
      description:
        "I get my inspiration from the fictional world. I'm a social geek. Completely exploit 24/365 catalysts for change whereas high standards in action items. Conveniently whiteboard multifunctional benefits without enabled leadership.",
    };
    this.content = [];
    for (let i = 0; i < 5; i++) {
      this.content.push(
        <Article blog={blog} top="calc()" />
      );
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Title top="25vh" />
        <Content>
          <div className="authorContainer">
            <div className="authorImage"></div>
            <SectionHeader marginTop="40px">
              AUTHOR &sdot; {this.state.author}
            </SectionHeader>
            <SectionUnderline />
            <div className="authorDiscription">{this.state.description}</div>
          </div>
          {/* <SectionHeader>USER BLOG</SectionHeader>
          <SectionUnderline /> */}
          <div>{this.content}</div>
        </Content>
      </div>
    );
  }
}

export default Profile;
