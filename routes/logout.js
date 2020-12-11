const router = require('express').Router()
const reqAnalyser = require('../function/reqAnalyser')

/* Get Logout Page */
router.get('/logout', function(req, res, next) {
    // Suppression des information utilisateur de la session
    delete req.session.user

    // Récupérer les informations destiné au headers
    let headersData = reqAnalyser.getHeadersDataFromReq(req)

    res.render('pages/logout', {
        title: "logout",
        navLang : headersData.navLang,
        user: headersData.user
    })
})

module.exports = router;