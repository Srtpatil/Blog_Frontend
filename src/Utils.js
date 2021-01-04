import { store } from "react-notifications-component";
export const API_DEV = "http://localhost:8081/";
export const IMAGE_SERVICE =
  "http://optimizeit-image-service.centralindia.cloudapp.azure.com:5000/";

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
    /**
     * @param  {string} text
     * @param  {string} type
     * @param  {string} title
     * @param  {Number} duration
     */
    add: (text, type, title, duration) => {
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

  const isLoggedinWithApi = () => {
    return fetch(`${API_DEV}auth/login/success`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        return responseJson;
      });
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
    sessionStorage.clear();
  };

  const isSuperUser = () => {};

  return {
    isLoggedin,
    isAuthor,
    isSuperUser,
    clear,
    getUserId,
    isLoggedinWithApi,
  };
};

export default UserManager();
