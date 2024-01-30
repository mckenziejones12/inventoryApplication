const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("in jhere");
  res.redirect("/catalog");
});

module.exports = router;
