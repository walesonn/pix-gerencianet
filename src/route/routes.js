const payment = require("../controller/payment");
const webhook = require("../controller/webhook");
const router = require("express").Router();

router.get("/", payment);
router.post("/webhook(/pix)?", webhook);

module.exports = router;
