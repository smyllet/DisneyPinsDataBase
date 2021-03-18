const router = require('express').Router()

const db_application = require('../model/db_application')
const db_pins = require('../model/db_pins')
const db_series = require('../model/db_series')
const db_park = require('../model/db_park')
const db_country = require('../model/db_country')
const db_character = require('../model/db_characters')
const db_attraction = require('../model/db_attraction')
const db_type = require('../model/db_type')

/* API Authentication */
router.get('/api/*', (req, res, next) => {
    let token = req.headers.token
    if(token) {
        db_application.getApplicationByToken(token).then(result => {
            if(result) next()
            else {
                res.status(401).json({
                    error: {
                        status: 401,
                        code: "invalid_token",
                        message: "token is invalid"
                    }
                })
            }
        }).catch(() => {
            res.status(500).json({
                error: {
                    status: 500,
                    code: "database_error",
                    message: "an error occurred during the request to the database"
                }
            })
        })
    }
    else {
        res.status(400).json({
            error: {
                status: 400,
                code: "no_token",
                message: "no token in headers"
            }
        })
    }
})

/* API GET - test */
router.get('/api/test', (req, res) => {
    res.json({
        test: true
    })
})

/* - - - - - Pins - - - - - */
/* API GET - Pins by id */
router.get('/api/pins/:id', (req, res) => {
    db_pins.getFullPinsById(req.params.id).then(result => {
        res.json({
            parameters: {
                pins_id: req.params.id
            },
            result: (result && result.id) ? result : null
        })
    }).catch(() => {
        res.status(500).json({
            parameters: {
                pins_id: req.params.id
            },
            error: {
                status: 500,
                code: "database_error",
                message: "an error occurred during the request to the database"
            }
        })
    })
})

/* - - - - - Series - - - - - */
/* API GET - Series by id */
router.get('/api/series/:id', (req, res) => {
    db_series.getFullSeriesById(req.params.id).then(result => {
        res.json({
            parameters: {
                series_id: req.params.id
            },
            result: (result && result.id) ? result : null
        })
    }).catch(() => {
        res.status(500).json({
            parameters: {
                series_id: req.params.id
            },
            error: {
                status: 500,
                code: "database_error",
                message: "an error occurred during the request to the database"
            }
        })
    })
})

/* - - - - - Character - - - - - */
/* API GET - Character by id */
router.get('/api/character/:id', (req, res) => {
    db_character.getFullCharacterById(req.params.id).then(result => {
        res.json({
            parameters: {
                character_id: req.params.id
            },
            result: (result && result.id) ? result : null
        })
    }).catch(() => {
        res.status(500).json({
            parameters: {
                character_id: req.params.id
            },
            error: {
                status: 500,
                code: "database_error",
                message: "an error occurred during the request to the database"
            }
        })
    })
})

/* - - - - - Attraction - - - - - */
/* API GET - Attraction by id */
router.get('/api/attraction/:id', (req, res) => {
    db_attraction.getFullAttractionById(req.params.id).then(result => {
        res.json({
            parameters: {
                attraction__id: req.params.id
            },
            result: (result && result.id) ? result : null
        })
    }).catch(() => {
        res.status(500).json({
            parameters: {
                attraction_id: req.params.id
            },
            error: {
                status: 500,
                code: "database_error",
                message: "an error occurred during the request to the database"
            }
        })
    })
})

/* - - - - - Type - - - - - */
/* API GET - Type by id */
router.get('/api/type/:id', (req, res) => {
    db_type.getFullTypeById(req.params.id).then(result => {
        res.json({
            parameters: {
                type_id: req.params.id
            },
            result: (result && result.id) ? result : null
        })
    }).catch(() => {
        res.status(500).json({
            parameters: {
                type_id: req.params.id
            },
            error: {
                status: 500,
                code: "database_error",
                message: "an error occurred during the request to the database"
            }
        })
    })
})

/* - - - - - Park - - - - - */
/* API GET - Park by id */
router.get('/api/park/:id', (req, res) => {
    db_park.getFullParkById(req.params.id).then(result => {
        res.json({
            parameters: {
                park_id: req.params.id
            },
            result: (result && result.id) ? result : null
        })
    }).catch(() => {
        res.status(500).json({
            parameters: {
                park_id: req.params.id
            },
            error: {
                status: 500,
                code: "database_error",
                message: "an error occurred during the request to the database"
            }
        })
    })
})

/* - - - - - Country - - - - - */
/* API GET - Country by id */
router.get('/api/country/:id', (req, res) => {
    db_country.getFullCountryById(req.params.id).then(result => {
        res.json({
            parameters: {
                country_id: req.params.id
            },
            result: (result && result.id) ? result : null
        })
    }).catch(() => {
        res.status(500).json({
            parameters: {
                country_id: req.params.id
            },
            error: {
                status: 500,
                code: "database_error",
                message: "an error occurred during the request to the database"
            }
        })
    })
})

/* API GET 404 */
router.get('/api/*', (req, res) => {
    res.sendStatus(404)
})

module.exports = router;