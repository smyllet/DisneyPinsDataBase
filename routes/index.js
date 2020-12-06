const router = require('express').Router()
const reqAnalyser = require('../function/reqAnalyser')

/* Get Index Page */
router.get('/', function(req, res, next) {
    // Récupérer les information destiné au headers
    let headersData = reqAnalyser.getHeadersDataFromReq(req)

    res.render('pages/index.ejs', {
        title: "accueil",
        navLang : headersData.navLang,
        user: headersData.user
    })
})

module.exports = router;