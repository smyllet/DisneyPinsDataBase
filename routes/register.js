const router = require('express').Router()
const reqAnalyser = require('../function/reqAnalyser')
const db_user = require('../model/db_user')

/* Get Register Page */
router.get('/register', function(req, res) {
    // Rediriger les utilisateur déjà connecté à la page d'accueil
    if(req.session.user) return res.redirect('/')

    // Récupérer les information destiné au headers
    let headersData = reqAnalyser.getHeadersDataFromReq(req)

    // récupération et suppression d'erreur, si existante
    let error = (req.session.error)
    delete req.session.error

    res.render('pages/register.ejs', {
        title: "register",
        navLang : headersData.navLang,
        user: headersData.user,
        error: error
    })
})

// Post register request
router.post('/register', (req, res) => {
    // Redirection des utilisateur déjà authentifié
    if(req.session.user) return res.redirect('/')

    // Récupération des information du formulaire de connexion
    let register = req.body.register_form

    // Vérification mail existant
    db_user.checkMailAlreadyRegister(register.mail).then(r => {
        if(r)
        {
            // Redirection sur la page d'inscription avec message d'erreur si mail exists déjà
            req.session.error = "mail_already_register"
            res.redirect('/register')
        }
        else db_user.checkPseudoAlreadyRegister(register.pseudo).then(r => {
            if(r)
            {
                // Redirection sur la page d'inscription avec message d'erreur si pseudo exists déjà
                req.session.error = "pseudo_already_register"
                res.redirect('/register')
            }
            else db_user.createUser(register.pseudo, register.mail, register.firstName, register.name, register.password).then(r => {
                db_user.getUserById(r).then(r => {
                    req.session.user = r
                    res.redirect('/')
                })
            })
        })
    })
})

module.exports = router;