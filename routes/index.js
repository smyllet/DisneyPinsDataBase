const router = require('express').Router()

/* Get Index Page. */
router.get('/', function(req, res, next) {
    let navLang = req.acceptsLanguages( 'fr', 'en')
    if(!navLang) navLang = 'fr'
    res.render('pages/index.ejs', {
        title: "accueil",
        navLang : navLang
    })
})

module.exports = router;