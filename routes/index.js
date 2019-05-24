let express = require("express");
let router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.status(200).send("listen from index");
});

module.exports = router;
