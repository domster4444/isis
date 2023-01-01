const express = require("express");
const router = express.Router();

const { testControl } = require("../controllers/testController");

router.route("/test").get(testControl);

module.exports = router;
