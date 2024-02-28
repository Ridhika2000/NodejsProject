const session = require("node-sessionstorage");

const setAuthData = (token, user_type) => {
  session.setItem("authData", JSON.stringify({ token, user_type }));
};

const getAuthData = () => {
  const authData = session.getItem("authData");
  return authData ? JSON.parse(authData) : null;
};

const clearAuthData = () => {
  session.removeItem("authData");
};

const checkAuth = (user_type) => {
  const authData = getAuthData();
  return authData !== null && authData.user_type==user_type
};

const getToken = () => {
    const authData = getAuthData();
    return authData ? authData.token : null;
};


module.exports = { setAuthData, getAuthData, clearAuthData, checkAuth, getToken };
