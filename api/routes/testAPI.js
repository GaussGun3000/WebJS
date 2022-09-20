var express = require("express");
var router = express.Router();

router.get("/:rid", function(req, res, next)
{
    let rid = req.params.rid
    res.send("API is working properly, RID = " + rid);
});

module.exports = router;