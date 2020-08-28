const express = require("express");
const router = express.Router();

const { getUserFromName } = require("./users");

router.get("/users/:userName", (req, res) => {
  // const user = getUserFromName()
  res.status(200).json("quack!");
});

module.exports = router;
