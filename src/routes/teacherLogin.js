const express = require("express");
const router = express.Router();
const axios = require("axios");
const domain = require("./domain");
const { setAuthData, clearAuthData, checkAuth } = require("./checkAuth");

router.get("/login/teacher", (req, res) => {
  // Redirect to studentRecords if the user is already authenticated
  if (checkAuth('teacher')) {
    res.redirect("/studentRecords");
  } else {
    res.render("teacherLogin", { message: "", isUserAuth: checkAuth('teacher') });
  }
});

router.post("/getTeacherLogin", async (req, res) => {
  try {
    const response = await axios.post(`${domain}/api/users/login/teacher`, req.body);

    // Store the token and user_type in session storage
    setAuthData(response.data.token, 'teacher');

    res.redirect("/studentRecords");
  } catch (err) {
    console.error(err);
    res.render("teacherLogin", { message: "Teacher Unauthorized!!!", isUserAuth: checkAuth('teacher') });
  }
});

router.get("/logout", (req, res) => {
  // Clear the token and user_type from session storage on logout
  clearAuthData();
  res.redirect("/");
});

module.exports = router;
