import React, { Component } from "react";
import {
  SectionHeader,
  SectionUnderline,
} from "../../StyledComponents/Headers";
import { Container, SectionContainer } from "../../StyledComponents/Container";

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
      <Container>
        <SectionContainer>
          <SectionHeader>
            {this.props.title}
            <SectionUnderline />
          </SectionHeader>
          {this.props.children}
        </SectionContainer>
     </Container> 
    );
  }
}

export default Content;
