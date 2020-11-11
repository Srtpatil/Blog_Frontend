import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import Content from "../Content/Content";

function HomePage() {
  return (
    <div className="HomepageContainer">
      <Navbar />
      <Title
        title="A Knights, I bid you welcome to your new home"
        author="Samarth"
        homepage={true}
      />
      <Content />
    </div>
  );
}

export default HomePage;
