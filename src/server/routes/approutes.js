const express = require("express");
const router = express.Router();

//health check for the app

router.get("/ok", (req, res) => {
  res.json({
    success: true,
    message: "Doing just fine"
  });
});

router.route("/getcsrf").get((req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

//API's from here
router.use("/api/v1.0", require("./../api/v1.0/index"));

module.exports = router;
