const express = require("express");
const axios = require("axios");
const token = require("../middleware/token");
const router = express.Router();
const session = require("node-sessionstorage");
const domain = require("./domain");
const {checkAuth, getToken} = require("./checkAuth"); 
const checkUserAuth = require('../middleware/checkAuth')


router.get("/add",checkUserAuth(['teacher']), (req, res) => {
  res.render("addStudentResult",{message:null,isUserAuth:checkAuth('teacher')});
});

router.post("/addResult",checkUserAuth(['teacher']), (req, res) => {
  axios
    .post(`${domain}/api/students`, req.body, token(getToken()))
    .then((resp) => {
      console.log(resp);
      res.redirect("/studentRecords");
    })
    .catch((err) => {
      res.render("addStudentResult", { message: err.response.data.msg,isUserAuth:checkAuth('teacher') });
    });
});

module.exports = router;