const router = require('express').Router();

/* Get Index Page. */
router.get('/', function(req, res, next) {
    res.send('Disney Pins DataBase')
});

module.exports = router;