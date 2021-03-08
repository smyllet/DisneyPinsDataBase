const router = require('express').Router()
const reqAnalyser = require('../function/reqAnalyser')
const db_park = require('../model/db_park')
const db_privilege = require('../model/db_privilege')

/* Get Developer Page */
router.get('/getPrivilege', async function(req, res, next) {
    // Rediriger les utilisateur non connecté à la page de connexion
    if(!req.session.user) return res.redirect('/login')

    // Current request
    let currentContributorRequest = await db_privilege.getNewContributorRequestForUserId(req.session.user.id)
    let currentDeveloperRequest = await db_privilege.getNewDeveloperRequestForUserId(req.session.user.id)

    // Récupérer les informations destiné au headers
    let headersData = reqAnalyser.getHeadersDataFromReq(req)

    res.render('pages/getPrivilege', {
        title: "getPrivilege",
        navLang : headersData.navLang,
        user: headersData.user,
        currentContributorRequest: currentContributorRequest,
        currentDeveloperRequest: currentDeveloperRequest
    })
})

router.get('/getPrivilege/autocomplete', async function(req, res) {
    // Utilisateur non connecté
    if(!req.session.user) return res.status(403).send()

    let park = await db_park.getParkList()

    res.json({
        park: park
    })
})

router.post('/getPrivilege/contributor', async function (req, res) {
    // Rediriger les utilisateur non connecté à la page de connexion
    if(!req.session.user) return res.redirect('/login')

    // Refusé les demandes d'utilisateur déjà contributeur
    if(req.session.user.contributor) return res.redirect('/getPrivilege')

    let request = req.body.getPrivilegeContributor

    if(request)
    {
        await db_privilege.addNewContributorRequest(req.session.user.id, (request.park_id > 0) ? request.park_id : null, request.language_speak, !!(request.pass_annual), !!(request.old_pins), request.comment)
    }

    return res.redirect('/getPrivilege')
})

router.post('/getPrivilege/developer', async function (req, res) {
    // Rediriger les utilisateur non connecté à la page de connexion
    if(!req.session.user) return res.redirect('/login')

    // Refusé les demandes d'utilisateur déjà Développeur
    if(req.session.user.developer) return res.redirect('/getPrivilege')

    let request = req.body.getPrivilegeDeveloper

    if(request)
    {
        await db_privilege.addNewDeveloperRequest(req.session.user.id, request.language_speak, request.country_target, request.comment)
    }

    return res.redirect('/getPrivilege')
})

module.exports = router;