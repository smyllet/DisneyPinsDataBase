const router = require('express').Router();

/* Get Index Page. */
router.get('/', function(req, res, next) {
    res.render('pages/index.ejs', {
        title: "accueil"
    })
});

module.exports = router;