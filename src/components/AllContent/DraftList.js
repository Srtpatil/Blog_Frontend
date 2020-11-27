import EmptyContent from "../Static_Pages/EmptyContent";
import Loader from "../Static_Pages/Loader";
import Content from "../Content/Content";
import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import Article2 from "../Article/Article2";
import { useEffect, useState } from "react";

const blog = {
  title:
    "klorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, similique!",

  day: "05",
  month: "NOVEMBER",
  year: "2020",
  summary:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora incidunt quas reprehenderit corporis amet nesciunt, a alias asperiores? Atque excepturi eum, similique officiis veniam consequuntur tempora, numquam in repudiandae assumenda quos vitae, dicta delectus. Molestiae fuga eaque temporibus labore, assumenda veritatis impedit quam magnam pariatur, totam eius, officiis numquam! Molestiae, eveniet quae recusandae aut a, qui maxime magnam iure, asperiores similique dolorem. Ea, officiis voluptatum quae quidem aliquam tempora doloribus odio nesciunt libero dicta fuga dolor. Alias officia laborum id!",
  author: "Anonymous",
};

const DraftList = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let posts = [];

    for (let i = 0; i < 5; i++) {
      posts.push(
        <Article2
          blog={blog}
          firstButtonContent="Read on"
          secondButtonContent="Delete Draft"
        />
      );
    }
    setLoading(false);
    setContent(posts);
  }, []);

  return (
    <div>
      <Navbar />
      <Title top="25vh" disableFullScreen={true} />
      <Content title="Your Drafts">
        {loading ? (
          <Loader />
        ) : content.length === 0 ? (
          <EmptyContent />
        ) : (
          content
        )}
      </Content>
    </div>
  );
};

export default DraftList;
