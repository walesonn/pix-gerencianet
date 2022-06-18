const StatusCode = require("http-status-codes").default;

module.exports = (req, res, next) => {
  try {
    console.log(req.body);
    res.send("200");
  } catch (error) {
    next(error);
  }
};
