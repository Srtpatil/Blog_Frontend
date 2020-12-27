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

const secondButtonHandler = (user_id, post_id, history) => {
  fetch(`${API_DEV}bookmark/delete/${post_id}&${user_id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((res) => {
      if (!res.error) {
        NotificationManager().add(
          "Bookmark Removed Successfully",
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

const BookmarkList = (props) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    let user_id = UserManager.getUserId();

    fetch(`${API_DEV}bookmark/${user_id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("BM: ", data);
        let bookmarks = [];

        data.forEach((post) => {
          const post_id = post.data.post_id;
          const date = new Date(post.data.post.updatedAt);
          const bookmarkData = {
            post_id: post_id,
            title: post.data.post.title,
            day: date.getDate(),
            month: MonthList[date.getMonth()],
            year: date.getFullYear(),
            summary: post.data.post.summary,
            author: post.Authorname,
            authorId: post.data.post.user_id,
            content: post.data.post.content,
          };

          bookmarks.push(
            <Article2
              blog={bookmarkData}
              type="bookmark"
              firstButtonContent="Read on"
              secondButtonContent="Remove"
              secondButtonIcon={faTrash}
              secondButtonHandler={() =>
                secondButtonHandler(user_id, post_id, history)
              }
              secondButtonVisible={true}
            />
          );
        });
        setLoading(false);
        setContent(bookmarks);
        console.log(props.history);
      })
      .catch((err) => {
        console.log("Err: ", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <ReactNotification />
      <Navbar />
      <Title top="25vh" disableFullScreen={true} />
      <Content title="Your Bookmarks">
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

export default BookmarkList;
