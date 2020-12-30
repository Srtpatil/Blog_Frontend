import EmptyContent from "../Static_Pages/EmptyContent";
import Loader from "../Static_Pages/Loader";
import Content from "../Content/Content";
import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import Article2 from "../Article/Article2";
import { useEffect, useState } from "react";
import {
  faAngleLeft,
  faAngleRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import UserManager, {
  API_DEV,
  NotificationManager,
  MonthList,
} from "../../Utils";
import ReactNotification, { store } from "react-notifications-component";
import { useHistory } from "react-router-dom";
import { PaginationButton } from "../../StyledComponents/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  let history = useHistory();

  useEffect(() => {
    let user_id = UserManager.getUserId();
    let page = currentPage;
    fetch(`${API_DEV}bookmark/bm/${user_id}&${currentPage}`, {
      method: "GET",
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("BM: ", data);
        let bookmarks = [];

        data.posts.forEach((post) => {
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

        let lastpage = Math.ceil(data.count / 10);
        setLastPage(lastpage);
        setLoading(false);
        setContent(bookmarks);
        console.log(props.history);
      })
      .catch((err) => {
        console.log("Err: ", err);
        setLoading(false);
      });
  }, [currentPage]);

  const increasePageNumber = () => {
    setCurrentPage((prevPageNumber) => prevPageNumber + 1);
  };

  const decreasePageNumber = () => {
    setCurrentPage((prevPageNumber) => prevPageNumber - 1);
  };

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
        {content.length ? (
          <div className="paginationContainer">
            {currentPage === 1 ? null : (
              <PaginationButton onClick={decreasePageNumber}>
                {
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    style={{
                      fontSize: "18px",
                      marginBottom: "4px",
                      marginRight: "8px",
                    }}
                  />
                }
                previous
              </PaginationButton>
            )}

            {lastPage === currentPage ? null : (
              <PaginationButton
                style={{ marginLeft: "auto" }}
                onClick={increasePageNumber}
              >
                next{" "}
                {
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    style={{
                      fontSize: "18px",
                      marginBottom: "4px",
                      marginLeft: "8px",
                    }}
                  />
                }
              </PaginationButton>
            )}
          </div>
        ) : null}
      </Content>
    </div>
  );
};

export default BookmarkList;
