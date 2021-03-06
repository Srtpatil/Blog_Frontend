import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import "./Homepage.css";
import Content from "../Content/Content";
import Footer from "../Footer/Footer";
import Article from "../Article/Article";
import Article2 from "../Article/Article2";
import { useEffect, useState } from "react";
import {
  API_DEV,
  randomNumber,
  MonthList,
  NotificationManager,
} from "../../Utils";
import EmptyContent from "../Static_Pages/EmptyContent";
import FullscreenLoader from "../Static_Pages/FullscreenLoader";
import { Quotes } from "../../DummyData/Quotes";
import Loader from "../Static_Pages/Loader";
import UserManager from "../../Utils";
import { PaginationButton } from "../../StyledComponents/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const getBookmarks = () => {
  return fetch(`${API_DEV}bookmark/${UserManager.getUserId()}`, {
    method: "GET",
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      let bookmarks = [];
      if (data.posts) {
        bookmarks = [...bookmarks, ...data.posts];
      }
      return bookmarks;
    });
};

function HomePage(props) {
  const [content, setContent] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [quote, setQuote] = useState({
    text: "A house divided against itself cannot stand.",
    author: "Abraham Lincoln",
  });
  const [loading, setLoading] = useState(true);
  const [screenLoading, setScreenLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastPageNumber, setLastPageNumber] = useState(0);

  useEffect(() => {
    // check user logged in status
    fetch(`${API_DEV}auth/login/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        if (responseJson.success) {
          //raise notification success login
          if (!sessionStorage.getItem("loginNotification")) {
            console.log("no notification");
            NotificationManager().add(
              "You are sucessfully logged in",
              "success",
              `Hello,  ${responseJson.user.name}`,
              2000
            );
            sessionStorage.setItem("loginNotification", "true");
          }
          localStorage.setItem("isLoggedin", "true");
          localStorage.setItem("user_id", responseJson.user.user_id);
        } else {
          UserManager.clear();
        }

        setScreenLoading(false);
      })
      .catch((error) => {
        //raise notification error
        // NotificationManager().add(
        //   "Failed to log in",
        //   "warning",
        //   `Failure`,
        //   1500
        // );
        setScreenLoading(false);
        UserManager.clear();
      });
  }, []);

  useEffect(() => {
    const randomQuoteIndex = randomNumber(0, Quotes.length - 1);

    setLoading(true);

    fetch(`${API_DEV}post/latest_posts/${pageNumber}`, {
      method: "GET",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        // "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        let posts = [];
        let bookmarkedPosts = [];
        if (UserManager.isLoggedin()) {
          bookmarkedPosts = await getBookmarks();
        }

        data.posts.forEach((post) => {
          const date = new Date(post.updatedAt);

          let year = date.getFullYear();
          let month = date.getMonth();
          let dt = date.getDate();

          if (dt < 10) {
            dt = "0" + dt;
          }

          const postData = {
            post_id: post.post_id,
            title: post.title,
            day: dt,
            month: MonthList[month],
            year: year,
            summary: post.summary,
            author: post.user.name,
            authorId: post.user_id,
          };

          posts.push(
            <Article
              blog={postData}
              secondButtonText={"Bookmark"}
              routeProps={props}
              bookmarkedPosts={bookmarkedPosts}
            />
          );
        });

        let lastpage = Math.ceil(data.totalPosts / 10);

        setLastPageNumber(lastpage);
        setContent(posts);
        setQuote(Quotes[randomQuoteIndex]);
        setLoading(false);
        // NotificationManager().add(
        //   "Sucessfully Logged in",
        //   "success",
        //   "Hello ",
        //   1000
        // );
      })
      .catch((err) => {
        console.log(err);
        setLastPageNumber(1);
        setQuote(Quotes[randomQuoteIndex]);
        setLoading(false);
      });
  }, [pageNumber]);

  const increasePageNumber = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const decreasePageNumber = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  if (screenLoading) {
    return (
      <div>
        <ReactNotification />
        <FullscreenLoader />
      </div>
    );
  }

  return (
    <div>
      <ReactNotification />
      <Navbar />
      <Title title={`"${quote.text}`} author={quote.author} quote />
      <Content title="Latest Stories">
        {loading ? (
          <Loader />
        ) : content.length === 0 ? (
          <EmptyContent />
        ) : (
          content
        )}

        {content.length ? (
          <div className="paginationContainer">
            {pageNumber === 1 ? null : (
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

            {lastPageNumber === pageNumber ? null : (
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
      <Footer />
    </div>
  );
}

export default HomePage;
