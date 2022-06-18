require("dotenv/config");
const express = require("express");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const router = require("../src/route/routes");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../src/view"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "../public")));
app.use(router);

app.use(function (err, _req, res, _next) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
});

module.exports = app;
