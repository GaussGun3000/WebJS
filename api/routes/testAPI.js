var express = require("express");
var router = express.Router();
var session = require("express-session")
var Localizer = require("../public/javascripts/localizer.js")

router.use(session({
    secret: "secret",
    cookie: {},
    resave: false,
    saveUninitialized: false
}))

router.get("/stats", function(req, res, next)
{
    req.session.requestsSent ? req.session.requestsSent += 1 : req.session.requestsSent = 1
    const date = new Date()
    req.session.lastRequest = (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
    res.json({requestsSent: req.session.requestsSent, lastRequest: req.session.lastRequest})
});

module.exports = router;