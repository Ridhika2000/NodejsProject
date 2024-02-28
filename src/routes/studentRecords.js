const express = require("express");
const router = express.Router();
const axios = require("axios");
const checkUserAuth = require('../middleware/checkAuth')
const domain = require("./domain");
const session = require("node-sessionstorage");
const {checkAuth, getToken} = require("./checkAuth"); 
const token = require("../middleware/token");


router.get("/studentRecords", checkUserAuth(['teacher']), (req, res) => {
  axios
    .get(`${domain}/api/students`, token(getToken()))
    .then((resp) => {
      return res.render("studentRecords", { data: resp.data.data,isUserAuth:checkAuth('teacher') });
    })
    .catch((err) => {
        console.log(err);
    });
});
router.get("/deleteResult",checkUserAuth(['teacher']),(req,res)=>{
    const id = req.query.id;
    axios
      .delete(`${domain}/api/students/${id}`, token(getToken()))
      .then((resp) => {
          res.redirect("/studentRecords");
      })
      .catch((err) => {
        res.redirect("/studentRecords");
      });
})

module.exports = router;