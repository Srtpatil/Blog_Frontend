import { ReactComponent as NotFoundIcon } from "../../assets/not_found_1.svg";
import "./EmptyContent.css";
import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import Content from "../Content/Content";
import Footer from "../Footer/Footer";

const PageNotFound = () => {
  return (
    <div>
      <Navbar />
      <Title top="25vh" disableFullScreen={true} />
      <Content title="Not Found">
        <div className="EmptyContainer">
          <NotFoundIcon className="EmptyIcon" />
        </div>
      </Content>
      <Footer />
    </div>
  );
};

export default PageNotFound;
