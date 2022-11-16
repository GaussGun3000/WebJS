var express = require("express");
var router = express.Router();
const auth = require("../public/javascripts/authHandler")
var session = require("express-session")
const {log} = require("debug");

router.use(session({
    secret: "secret",
    cookie: {httpOnly: true, maxAge: 3600000},
    resave: true,
    saveUninitialized: false
}))

router.post("/", auth.handleLogin)

router.get("/stats", function(req, res, next)
{
    console.log(req.session, req)
    req.session.requestsSent ? req.session.requestsSent += 1 : req.session.requestsSent = 1
    const date = new Date()
    req.session.lastRequest = (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
    res.json({requestsSent: req.session.requestsSent, lastRequest: req.session.lastRequest})
});

module.exports = router
