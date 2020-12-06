const router = require('express').Router()
const url = require('url')
const db_user = require('../model/db_user')
const reqAnalyser = require('../function/reqAnalyser')

/* Get Login Page */
router.get('/login', (req, res) => {
    // Rediriger les utilisateur déjà connecté à la page d'accueil
    if(req.session.user) return res.redirect('/')

    // Récupérer les information destiné au headers
    let headersData = reqAnalyser.getHeadersDataFromReq(req)

    // Déterminé si l'utilisateur à été envoyé sur cette page pour information de connexion incorrect
    let wrongIdentity = (req.session.wrongIdentity)
    delete req.session.wrongIdentity

    // Rendu de la page de login
    res.render('pages/login.ejs', {
        title: "login",
        navLang : headersData.navLang,
        user: headersData.user,
        wrongIdentity: wrongIdentity
    })
})

// Post Connexion Utilisateur
router.post('/login', (req, res) => {
    // Récupération des information du formulaire de connexion
    let login = req.body.login_form

    // Si une adresse mail et un mot de passe à été fournis
    if(login.mail && login.password)
    {
        // Récupéré l'utilisateur si ses identifiant sont correct
        db_user.getUserByIdentification(login.mail,login.password).then(r => {
            // Si un utilisateur est retourné
            if(r)
            {
                // Renseigné les information utilisateur en donnée de session et le redirigé sur la page d'accueil
                req.session.user = r
                res.redirect('/')
            }
            else
            {
                // Sinon stocké en session que les identifiant sont incorrect puis rediriger sur la page de connexion
                req.session.wrongIdentity = true
                res.redirect('/login')
            }
        })
    }
    else res.redirect('/login') // sinon rediriger sur page de connexion
})

module.exports = router;