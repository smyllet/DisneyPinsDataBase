const router = require('express').Router()
const reqAnalyser = require('../function/reqAnalyser')

const db_privilege = require('../model/db_privilege')
const db_contributor = require('../model/db_contributor')
const db_developer = require('../model/db_developer')

/* Get Admin Page */
router.get('/admin', async function(req, res, next) {
    // Rediriger les utilisateur non connecté à la page de connexion
    if(!req.session.user) return res.redirect('/login')

    // Rediriger les utilisateur non admin à la page d'accueil
    if(!req.session.user.admin) return res.redirect('/')

    // Récupérer les informations destiné au headers
    let headersData = reqAnalyser.getHeadersDataFromReq(req)

    res.render('pages/admin', {
        title: "admin",
        navLang : headersData.navLang,
        user: headersData.user
    })
})

/* Get Requests List */
router.get('/admin/privilegeRequestsList', async function (req, res) {
    // Utilisateur non connecté
    if(!req.session.user) return res.status(403).send()

    // Utilisateur non connecté
    if(!req.session.user.admin) return res.status(403).send()

    // Récupération de la liste des demandes
    let requestsList = await db_privilege.getAllRequestsList()

    res.json({
        requestsList: requestsList
    })
})

/* Get Contributor Request by id */
router.get('/admin/getPrivilegeRequest/contributor/:request_id', async function (req, res) {
    // Utilisateur non connecté
    if(!req.session.user) return res.status(403).send()

    // Utilisateur non connecté
    if(!req.session.user.admin) return res.status(403).send()

    // update request statut
    await db_privilege.setContributorRequestStatusById(req.params.request_id, 1)

    // Récupération de la demande
    let request = await db_privilege.getContributorRequestById(req.params.request_id)

    res.json({
        request: request
    })
})

/* Get Developer Request by id */
router.get('/admin/getPrivilegeRequest/developer/:request_id', async function (req, res) {
    // Utilisateur non connecté
    if(!req.session.user) return res.status(403).send()

    // Utilisateur non connecté
    if(!req.session.user.admin) return res.status(403).send()

    // update request statut
    await db_privilege.setDeveloperRequestStatusById(req.params.request_id, 1)

    // Récupération de la demande
    let request = await db_privilege.getDeveloperRequestById(req.params.request_id)

    res.json({
        request: request
    })
})

/* POST Refuse Request By id */
router.post('/admin/setPrivilegeRequestStatus/refuse/developer/:request_id', async function (req, res) {
    // Utilisateur non connecté
    if(!req.session.user) return res.status(403).send()

    // Utilisateur non connecté
    if(!req.session.user.admin) return res.status(403).send()

    // update request statut
    await db_privilege.setDeveloperRequestStatusById(req.params.request_id, 2).then(() => res.status(200).send()).catch(() => res.status(500).send())
})

/* POST Refuse Request By id */
router.post('/admin/setPrivilegeRequestStatus/refuse/contributor/:request_id', async function (req, res) {
    // Utilisateur non connecté
    if(!req.session.user) return res.status(403).send()

    // Utilisateur non connecté
    if(!req.session.user.admin) return res.status(403).send()

    // update request statut
    db_privilege.setContributorRequestStatusById(req.params.request_id, 2).then(() => res.status(200).send()).catch(() => res.status(500).send())
})

/* POST Refuse Request By id */
router.post('/admin/setPrivilegeRequestStatus/accept/developer/:request_id', async function (req, res) {
    // Utilisateur non connecté
    if(!req.session.user) return res.status(403).send()

    // Utilisateur non connecté
    if(!req.session.user.admin) return res.status(403).send()

    // update request statut
    db_privilege.setDeveloperRequestStatusById(req.params.request_id, 3).then(() => {
        db_developer.setNewDeveloperWithRequestId(req.params.request_id).then(() => res.status(200).send()).catch(() => res.status(500).send())
    }).catch(() => res.status(500).send())
})

/* POST Refuse Request By id */
router.post('/admin/setPrivilegeRequestStatus/accept/contributor/:request_id', async function (req, res) {
    // Utilisateur non connecté
    if(!req.session.user) return res.status(403).send()

    // Utilisateur non connecté
    if(!req.session.user.admin) return res.status(403).send()

    // update request statut
    db_privilege.setContributorRequestStatusById(req.params.request_id, 3).then(() => {
        db_contributor.setNewContributorWithRequestId(req.params.request_id).then(() => res.status(200).send()).catch(() => res.status(500).send())
    }).catch(() => res.status(500).send())
})

module.exports = router;