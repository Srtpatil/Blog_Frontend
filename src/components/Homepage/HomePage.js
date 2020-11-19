import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import "./Homepage.css";
import Content from "../Content/Content";
import Footer from "../Footer/Footer";
import Article from "../Article/Article";
import Article2 from "../Article/Article2";


const blog = {
  title:
    "klorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, similique!",

  day: "05",
  month: "NOVEMBER",
  year: "2020",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora incidunt quas reprehenderit corporis amet nesciunt, a alias asperiores? Atque excepturi eum, similique officiis veniam consequuntur tempora, numquam in repudiandae assumenda quos vitae, dicta delectus. Molestiae fuga eaque temporibus labore, assumenda veritatis impedit quam magnam pariatur, totam eius, officiis numquam! Molestiae, eveniet quae recusandae aut a, qui maxime magnam iure, asperiores similique dolorem. Ea, officiis voluptatum quae quidem aliquam tempora doloribus odio nesciunt libero dicta fuga dolor. Alias officia laborum id!",
  author: "Anonymous",
};

function HomePage() {
  let content = [];
  for (let i = 0; i < 5; i++) {
    content.push(<Article blog={blog} />);
  }
  return (
    <div>
      <Navbar />
      <Title
        title="Knights, I bid you welcome to your new home"
        author="Lorem ipsum"
      />
      <Content title="Latest Stories">{content}</Content>
      <Footer />
    </div>
  );
}

export default HomePage;
