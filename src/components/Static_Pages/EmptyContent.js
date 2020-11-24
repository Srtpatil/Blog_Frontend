import { ReactComponent as EmptyIcon } from "../../assets/Empty_1.svg";
import "./EmptyContent.css";

const EmptyContent = () => {
  return (
    <div className="EmptyContainer">
      <EmptyIcon className="EmptyIcon" />
      <div className="EmptyContentText">Sorry No Content Found !</div>
    </div>
  );
};

export default EmptyContent;
