const router = require('express').Router()
const reqAnalyser = require('../function/reqAnalyser')

/* Get Documentation Page */
router.get('/documentation', async function(req, res, next) {
    // Récupérer les informations destiné au headers
    let headersData = reqAnalyser.getHeadersDataFromReq(req)

    res.render('pages/documentation', {
        title: "documentation",
        navLang : headersData.navLang,
        user: headersData.user
    })
})

module.exports = router;