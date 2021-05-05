const router = require('express').Router()
const reqAnalyser = require('../function/reqAnalyser')
const db_series = require('../model/db_series')
const db_attraction = require('../model/db_attraction')
const db_personnage = require('../model/db_characters')
const db_type = require('../model/db_type')
const db_pins = require('../model/db_pins')

/* Get Contribution Page */
router.get('/contribute', async function(req, res) {
    // Rediriger les utilisateur non connecté à la page de connexion
    if(!req.session.user) return res.redirect('/login')

    // Rediriger les utilisateur non contributeur à la page d'accueil
    if(!req.session.user.contributor) return res.redirect('/')

    // Récupérer les information destiné au headers
    let headersData = reqAnalyser.getHeadersDataFromReq(req)

    // récupération et suppression du status d'ajout, si existante
    let contributeResult = (req.session.contributeResult)
    delete req.session.contributeResult

    res.render('pages/contribute.ejs', {
        title: "contribution",
        navLang : headersData.navLang,
        user: headersData.user,
        contributeResult: contributeResult
    })
})

router.get('/contribute/autocomplete', async function(req, res) {
    // Rediriger les utilisateur non connecté à la page de connexion
    if(!req.session.user) return res.status(403).send()

    // Rediriger les utilisateur non contributeur à la page d'accueil
    if(!req.session.user.contributor) return res.status(403).send()

    let series = await db_series.getShortSeriesList()
    let attractions = await db_attraction.getAttractionList()
    let personnages = await db_personnage.getCharactersList()
    let type = await db_type.getTypeList()

    res.json({
        series: series,
        attractions: attractions,
        personnages: personnages,
        type: type
    })
})

router.post('/contribute/pins', async function(req, res){
    // Rediriger les utilisateur non connecté à la page de connexion
    if(!req.session.user) return res.status(403).send()

    // Rediriger les utilisateur non contributeur à la page d'accueil
    if(!req.session.user.contributor) return res.status(403).send()

    // Récupération du formulaire
    let pins = req.body.add_pins_form

    if(pins) {
        let resultat = await db_pins.createPins(pins.name, pins.release_date, pins.edition_number, pins.series_id, pins.type, req.session.user.id, (pins.personnage) ? pins.personnage.split(',') : null, (pins.attraction) ? pins.attraction.split(',') : null)
        if(resultat) {
            req.session.contributeResult = {
                type: 'pins',
                status: 200
            }
            res.redirect('/contribute')
        } else {
            req.session.contributeResult = {
                type: 'pins',
                status: 500
            }
            res.redirect('/contribute')
        }
    }
    else {
        req.session.contributeResult = {
            type: 'pins',
            status: 400
        }
        res.redirect('/contribute')
    }
})

module.exports = router;