import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import { Component } from "react";
import "./Homepage.css";
import Footer from "../Footer/Footer";

class HomePage extends Component {
  render() {
    return (
      <div className="HomepageContainer">
        <Navbar />
        <Title
          title="Knights, I bid you welcome to your new home"
          author="Samarth"
          homepage={true}
          divider={false}
        />
      </div>
    );
  }
}

export default HomePage;
