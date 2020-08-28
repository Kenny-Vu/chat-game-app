const express = require("express");
const router = express.Router();

router.get("/users/:userName", (req, res) => {
  res.status(200).json("quack!");
});

module.exports = router;
