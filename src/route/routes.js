const payment = require("../controller/payment");
const webhook = require("../controller/webhook");
const router = require("express").Router();

router.get("/", payment);
router.post("/webhook(/pix)?", webhook);

router.all("*", (req, res, next) => {
  next(new Error("Page not found"));
});

module.exports = router;
