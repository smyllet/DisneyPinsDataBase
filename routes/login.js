const router = require('express').Router()

/* Get Index Page. */
router.get('/login', function(req, res, next) {
    let navLang = req.acceptsLanguages( 'fr', 'en')
    if(!navLang) navLang = 'fr'
    res.render('pages/login.ejs', {
        title: "login",
        navLang : navLang
    })
})

module.exports = router;