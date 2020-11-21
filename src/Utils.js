export const API_DEV = "http://localhost:8081/";

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
