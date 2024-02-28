const express = require("express");
const router = express.Router();
const axios = require("axios");
const checkUserAuth = require('../middleware/checkAuth')
const domain = require("./domain");
const {checkAuth, getToken} = require("./checkAuth"); 
const token = require("../middleware/token");
const session = require("node-sessionstorage");


router.get("/edit",checkUserAuth(['teacher']), (req, res) => {
  const id = req.query.id;
  console.log(id)
  axios
    .get(`${domain}/api/students/${id}`, token(getToken()))
    .then((resp) => {
      return res.render("editStudentResult", { data: resp.data.data,isUserAuth:checkAuth('teacher')});
    })
    .catch((err) => {
      res.redirect("/studentRecords");
    });
});
router.post("/editResult",checkUserAuth(['teacher']), (req, res) => {
  const id = req.query.id;
  console.log(req.body);
  axios
    .patch(
      `${domain}/api/students/${id}`,
      req.body,
      token(getToken())
    )
    .then((resp) => {
      console.log(resp);
      res.redirect("/studentRecords");
    })
    .catch((err) => {
      console.log(err);
      res.render("editStudentResult", { message: "Failed to edit student", isUserAuth: checkAuth('teacher') });
    });
});

module.exports = router;