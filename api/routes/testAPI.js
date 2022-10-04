var express = require("express");
var router = express.Router();
var Localizer = require("../public/javascripts/localizer.js")

router.get("/", function(req, res, next)
{
    let rid = req.query.rid;
    let locale = req.query.locale;
    let localizer;
    let response;
    try {
        if (!locale) {
            localizer = new Localizer('en')
            response = localizer.getLocalizedText('api response')
        } else {
            localizer = new Localizer(locale)
            response = localizer.getLocalizedText('api response')
        }
    }
    catch (ex)
    {
        if (ex.message === `Illegal -locale- argument value (${locale}) at Localizer constructor!`)
        { response = `Language "${locale}" is not supported`;}
        else
        {
            console.log(ex);
            response = ex.description;
        }
    }
    res.send(response + ` RID = ${rid}`);
});

module.exports = router;