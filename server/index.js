"use strict";

const express = require("express");
const morgan = require("morgan");
const router = require("./Routes/Routes");

const PORT = 8000;

express()
//what is this?
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
  // .use(express.static("./server/assets"))
  .use(express.json())
  // what is this?
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .use(router)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));