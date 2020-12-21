import EmptyContent from "../Static_Pages/EmptyContent";
import Loader from "../Static_Pages/Loader";
import Content from "../Content/Content";
import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import Article2 from "../Article/Article2";
import { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import UserManager, {
  API_DEV,
  NotificationManager,
  MonthList,
} from "../../Utils";
import ReactNotification, { store } from "react-notifications-component";
import { useHistory } from "react-router-dom";

const secondButtonHandler = (blog, history) => {
  const post_id = blog.post_id;
  console.log("Here!");
  fetch(`${API_DEV}post/${post_id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + UserManager.getToken(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog.content),
  })
    .then((resp) => resp.json())
    .then((res) => {
      console.log("Draft Remove: ", res);
      if (!res.error) {
        NotificationManager().add(
          "Draft Removed Successfully",
          "success",
          "Success",
          1000
        );

        setTimeout(() => {
          history.push("/");
        }, 500);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const DraftList = (props) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    let user_id = UserManager.getUserId();

    fetch(`${API_DEV}post/draft/${user_id}`)
      .then((resp) => resp.json())
      .then((data) => {
        let drafts = [];

        data.forEach((post) => {
          const date = new Date(post.updatedAt);
          console.log(post);
          const draftData = {
            post_id: post.post_id,
            title: post.title,
            day: date.getDate(),
            month: MonthList[date.getMonth()],
            year: date.getFullYear(),
            summary: post.summary,
            author: post.user.name,
            authorId: post.user_id,
            content: post.content,
          };

          drafts.push(
            <Article2
              blog={draftData}
              type="draft"
              firstButtonContent="Read on"
              secondButtonContent="Delete Draft"
              secondButtonIcon={faTrash}
              secondButtonHandler={() =>
                secondButtonHandler(draftData, history)
              }
            />
          );
        });
        setLoading(false);
        setContent(drafts);
        console.log(props.history);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <ReactNotification />
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
