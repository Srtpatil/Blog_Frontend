import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";

function HomePage() {
  return (
    <div className="HomepageContainer">
      <Navbar />
      <Title
        title="A Knights, I bid you welcome to your new home"
        author="Samarth"
        homepage={true}
      />
    </div>
  );
}

export default HomePage;
