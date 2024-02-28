const express = require("express");
const router = express.Router();
const axios = require("axios");
const domain = require("./domain");
const { setAuthData, clearAuthData, checkAuth } = require("./checkAuth");

router.get("/login/student", (req, res) => {
  // Redirect to studentRecords if the user is already authenticated
  if (checkAuth('student')) {
    res.redirect("/search");
  } else {
    res.render("studentLogin", { message: "", isUserAuth: checkAuth('student') });
  }
});

router.post("/getStudentLogin", async (req, res) => {
  try {
    const response = await axios.post(`${domain}/api/users/login/student`, req.body);

    // Store the token and user_type in session storage
    setAuthData(response.data.token, 'student');

    res.redirect("/search");
  } catch (err) {
    console.error(err);
    res.render("studentLogin", { message: "Student Unauthorized!!!", isUserAuth: checkAuth('student') });
  }
});

router.get("/logout", (req, res) => {
  // Clear the token and user_type from session storage on logout
  clearAuthData();
  res.redirect("/");
});

module.exports = router;

