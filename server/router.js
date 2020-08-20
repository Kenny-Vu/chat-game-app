const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("quack!");
});

module.exports = router;
