import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import "./Homepage.css";
import Content from "../Content/Content";

function HomePage() {
  return (
    <div className="HomepageContainer">
      <Navbar />
      <Title
        title="Knights, I bid you welcome to your new home"
        author="Lorem ipsum"
        homepage={true}
        divider={false}
      />
      <Content />
    </div>
  );
}

export default HomePage;
