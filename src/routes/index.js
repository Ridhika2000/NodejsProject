const express = require("express");
const router = express.Router();

// router
router.get("/", (req, res) => {
  res.render("index",{isUserAuth: false} );
});

module.exports = router;