const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const PORT = 4000;

const { handleFourOhFour } = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  .get("/test", handleFourOhFour)
  .listen(PORT, () => {
    console.info(`listening on http://localhost:${PORT}`);
  });
