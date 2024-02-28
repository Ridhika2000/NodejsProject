const axios = require("axios");
const express = require("express");
const domain = require("./domain");
const router = express.Router();
const {checkAuth, getToken} = require("./checkAuth"); 
const token = require("../middleware/token");

router.get("/search", (req, res) => {
  res.render("searchResult",{isUserAuth:checkAuth('student'),message:""});
});

router.post("/searchResult", (req, res) => {
  axios
    .post(`${domain}/api/students/find`, req.body, token(getToken()))
    .then((rs) => {
      res.render("result",{data:rs.data.data,isUserAuth:checkAuth('student')});
    })
    .catch((err) => {
      console.log(err);
      res.render("searchResult",{isUserAuth:checkAuth('student'),message:err.response.data.msg});
    });
});

module.exports = router;