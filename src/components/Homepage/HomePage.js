import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import "./Homepage.css";
import Content from "../Content/Content";
import Footer from "../Footer/Footer";
import Article from "../Article/Article";
import Article2 from "../Article/Article2";
import { useEffect, useState } from "react";
import { API_DEV, randomNumber, MonthList } from "../../Utils";
import EmptyContent from "../Static_Pages/EmptyContent";
import FullscreenLoader from "../Static_Pages/FullscreenLoader";
import { Quotes } from "../../DummyData/Quotes";
import Loader from "../Static_Pages/Loader";
import UserManager from "../../Utils";
import { PaginationButton } from "../../StyledComponents/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const blog = {
  title:
    "klorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, similique!",

  day: "05",
  month: "NOVEMBER",
  year: "2020",
  summary:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora incidunt quas reprehenderit corporis amet nesciunt, a alias asperiores? Atque excepturi eum, similique officiis veniam consequuntur tempora, numquam in repudiandae assumenda quos vitae, dicta delectus. Molestiae fuga eaque temporibus labore, assumenda veritatis impedit quam magnam pariatur, totam eius, officiis numquam! Molestiae, eveniet quae recusandae aut a, qui maxime magnam iure, asperiores similique dolorem. Ea, officiis voluptatum quae quidem aliquam tempora doloribus odio nesciunt libero dicta fuga dolor. Alias officia laborum id!",
  author: "Anonymous",
};
const getBookmarks = () => {
  return fetch(`${API_DEV}bookmark/${UserManager.getUserId()}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
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
  const [pageNumber, setPageNumber] = useState(1);
  const [lastPageNumber, setLastPageNumber] = useState(0);

  useEffect(() => {
    // check user logged in status
    fetch(`${API_DEV}auth/login/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        // "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        //raise notification success login
        console.log(responseJson);

        if (responseJson.success) {
          localStorage.setItem("isLoggedin", "true");
          localStorage.setItem("user_id", responseJson.user.user_id);
          setAuthenticated(true);
        } else {
          UserManager.clear();
          setAuthenticated(false);
        }
      })
      .catch((error) => {
        //raise notification error
        UserManager.clear();
        setAuthenticated(false);
        // this.setState({
        //   authenticated: false,
        //   error: "Failed to authenticate user",
        // });
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
          console.log(bookmarkedPosts[0]);
        }

        console.log(data);
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

  return (
    <div>
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
      </Content>
      <Footer />
    </div>
  );
}

export default HomePage;
