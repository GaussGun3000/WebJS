var express = require("express");
var router = express.Router();
const auth = require("../public/javascripts/authHandler")

router.post("/", auth.handleLogin)

module.exports = router
