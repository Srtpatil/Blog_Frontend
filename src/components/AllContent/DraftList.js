import EmptyContent from "../Static_Pages/EmptyContent";
import Loader from "../Static_Pages/Loader";
import Content from "../Content/Content";
import Navbar from "../Navbar/Navbar";
import Title from "../Title/Title";
import Article2 from "../Article/Article2";
import { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import UserManager, { API_DEV, NotificationManager } from "../../Utils";
import ReactNotification, { store } from "react-notifications-component";

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

const secondButtonHandler = (blog) => {
  const post_id = blog.post_id;

  fetch(`${API_DEV}post/${post_id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + UserManager.getToken(),
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((res) => {
      // if (!res.error) {
        NotificationManager().add(
          "Draft Removed Successfully",
          "success",
          "Success",
          1000
        );

        // setTimeout(() => {
        //   props.history.push("/");
        // }, 500);
      // }
    })
    .catch((err) => {
      console.log(err);
    });
};

const DraftList = (props) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let user_id = UserManager.getUserId();

    fetch(`${API_DEV}post/draft/${user_id}`)
      .then((resp) => resp.json())
      .then((data) => {
        let drafts = [];
        data.forEach((post) => {
          console.log(post);
          const draftData = {
            post_id: post.post_id,
            title: post.title,
            day: "05",
            month: "NOVEMBER",
            year: "2020",
            summary: post.summary,
            author: post.user.name,
            authorId: post.user_id,
          };

          drafts.push(
            <Article2
              blog={draftData}
              firstButtonContent="Read on"
              secondButtonContent="Delete Draft"
              secondButtonIcon={faTrash}
              // secondButtonHandler={() => secondButtonHandler(draftData)}
            />
          );
        });
        setLoading(false);
        setContent(drafts);
        console.log(props.history);
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
