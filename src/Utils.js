import { store } from "react-notifications-component";
export const API_DEV = "http://localhost:8081/";

// Random number between range
export const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const MonthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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
  const getUserId = () => {
    return localStorage.getItem("user_id");
  };

  const isLoggedin = () => {
    if (localStorage.getItem("isLoggedin")) {
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

  function createCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  function eraseCookie(name) {
    createCookie(name, "", -1);
  }

  const clear = () => {
    localStorage.clear();
  };

  const isSuperUser = () => {};

  return {
    isLoggedin,
    isAuthor,
    isSuperUser,
    clear,
    getUserId,
  };
};

export default UserManager();
