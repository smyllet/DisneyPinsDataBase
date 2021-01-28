const router = require('express').Router()
const reqAnalyser = require('../function/reqAnalyser')
const db_contribution = require('../model/db_contribution')

/* Get Contribution Page */
router.get('/contribution', async function(req, res) {
    // Rediriger les utilisateur non connecté à la page de connexion
    if(!req.session.user) return res.redirect('/login')

    // Rediriger les utilisateur non contributeur à la page d'accueil
    if(!req.session.user.contributor) return res.redirect('/')

    // Récupérer les information destiné au headers
    let headersData = reqAnalyser.getHeadersDataFromReq(req)

    // Récupération des dernière contribution de l'utilisateur
    let contribUser = await db_contribution.getLastContributionsFromUserId(headersData.user.id,5)

    // Récupération des dernière contribution global
    let contrib = await db_contribution.getLastContributions(5)

    res.render('pages/contribution.ejs', {
        title: "contribution",
        navLang : headersData.navLang,
        user: headersData.user,
        contribUser: contribUser,
        contrib: contrib
    })
})

module.exports = router;