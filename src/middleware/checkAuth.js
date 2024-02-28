const { getAuthData } = require("../routes/checkAuth");

module.exports = (allowedUserTypes) => (req, res, next) => {
  const authData = getAuthData(); 
  console.log(authData.user_type)
  if (!authData || !allowedUserTypes.includes(authData.user_type)) {
    res.render("index", { message: `Please login as ${allowedUserTypes.join(' or ')} to proceed!!!`, isUserAuth: !!authData });
  } else {
    next();
  }
};


