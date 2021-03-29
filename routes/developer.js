const router = require('express').Router()
const reqAnalyser = require('../function/reqAnalyser')
const jwt = require('jsonwebtoken')

const config = require('../function/config')()

const db_application = require('../model/db_application')

/* Get Developer Page */
router.get('/developer', async function(req, res, next) {
    // Rediriger les utilisateur non connecté à la page de connexion
    if(!req.session.user) return res.redirect('/login')

    // Rediriger les utilisateur non développeur à la page d'accueil
    if(!req.session.user.developer) return res.redirect('/')

    // Récupérer les informations destiné au headers
    let headersData = reqAnalyser.getHeadersDataFromReq(req)

    res.render('pages/developer', {
        title: "developer",
        navLang : headersData.navLang,
        user: headersData.user
    })
})

/* Get Applications List */
router.get('/developer/getAccountApplicationList', async function (req, res) {
    // Utilisateur non connecté
    if(!req.session.user) return res.status(403).send()

    // Rediriger les utilisateur non développeur à la page d'accueil
    if(!req.session.user.developer) return res.status(403).send()

    // Récupération de la liste des demandes
    let applicationList = await db_application.getApplicationListForAccountId(req.session.user.id)

    res.json({
        applicationList: applicationList
    })
})

/* Add new application */
router.post('/developer/application/new/', async function (req, res) {
    // Utilisateur non connecté
    if(!req.session.user) return res.status(403).send()

    // Rediriger les utilisateur non développeur à la page d'accueil
    if(!req.session.user.developer) return res.status(403).send()

    let name = req.body.name
    let description = req.body.description
    let token = await jwt.sign({
        name: name,
        pseudo: req.session.user.pseudo,
        date: Date.now().toString()
    }, config.api.jwtSecretKey)
    let account_id = req.session.user.id

    // add application
    db_application.addApplication(name, description, token, account_id).then(() => {
        res.status(200).send()
    }).catch(() => res.status(500).send())
})

/* Remove new application */
router.post('/developer/application/remove/:id', async function (req, res) {
    // Utilisateur non connecté
    if(!req.session.user) return res.status(403).send()

    // Rediriger les utilisateur non développeur à la page d'accueil
    if(!req.session.user.developer) return res.status(403).send()

    let id = req.params.id

    // remove application
    db_application.removeApplication(id).then(() => {
        res.status(200).send()
    }).catch(() => res.status(500).send())
})

/* Get Applications Token */
router.get('/developer/application/token/:id', async function (req, res) {
    // Utilisateur non connecté
    if(!req.session.user) return res.status(403).send()

    // Rediriger les utilisateur non développeur à la page d'accueil
    if(!req.session.user.developer) return res.status(403).send()

    let id = req.params.id

    // Récupération de la liste des demandes
    let data = await db_application.getApplicationTokenById(id)

    res.json({
        id: data.id,
        token: data.apiToken
    })
})

module.exports = router;