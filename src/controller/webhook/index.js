const StatusCode = require("http-status-codes").default;

module.exports = (req, res, next) => {
  try {
    console.log(req.body);
    res.sendStatus(StatusCode.OK);
  } catch (error) {
    next(error);
  }
};
