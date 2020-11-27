import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import "./Homepage.css";
import Content from "../Content/Content";
import Footer from "../Footer/Footer";
import Article from "../Article/Article";
import Article2 from "../Article/Article2";
import { useEffect, useState } from "react";
import { API_DEV } from "../../Utils";
import EmptyContent from "../Static_Pages/EmptyContent";
import FullscreenLoader from "../Static_Pages/FullscreenLoader";
import Loader from "../Static_Pages/Loader";

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

function HomePage() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_DEV}post/latest_posts/1`)
      .then((res) => res.json())
      .then((data) => {
        let posts = [];
        console.log(data);
        data.forEach((post) => {
          const postData = {
            post_id: post.post_id,
            title: post.title,
            day: "05",
            month: "NOVEMBER",
            year: "2020",
            summary: post.summary,
            author: post.user.name,
            authorId: post.user_id,
          };

          posts.push(<Article blog={postData} />);
        });

        setContent(posts);

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Title title="A scarcely ever blog" author="Lorem ipsum" />
      <Content title="Latest Stories">
        {loading ? (
          <Loader />
        ) : content.length === 0 ? (
          <EmptyContent />
        ) : (
          content
        )}
      </Content>
      <Footer />
    </div>
  );
}

export default HomePage;
