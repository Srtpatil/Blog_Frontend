import { store } from "react-notifications-component";

export const API_DEV = "http://localhost:8081/";

// Random number between range
export const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const NotificationManager = () => {
  const add = (text, type, title, duration) => {
    store.addNotification({
      title: title,
      message: text,
      type: type,
      insert: "top",
      container: "top-right",
      dismiss: {
        duration: duration,
        onScreen: false,
      },
    });
  };

  return {
    add: (text, type, title, duration) => {
      console.log(text);
      return add(text, type, title, duration);
    },
  };
};

const UserManager = () => {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const getUserId = () => {
    return localStorage.getItem("user_id");
  };

  const isLoggedin = () => {
    if (localStorage.getItem("authToken")) {
      return true;
    } else {
      return false;
    }
  };

  const isAuthor = () => {
    if (localStorage.getItem("Author_id")) {
      return true;
    } else {
      return false;
    }
  };

  const clear = () => {
    localStorage.clear();
  };

  const isSuperUser = () => {};

  return {
    getToken,
    isLoggedin,
    isAuthor,
    isSuperUser,
    clear,
    getUserId,
  };
};

export default UserManager();
