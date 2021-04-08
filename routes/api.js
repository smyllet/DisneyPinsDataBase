const router = require('express').Router()

const db_application = require('../model/db_application')
const db_pins = require('../model/db_pins')
const db_series = require('../model/db_series')
const db_park = require('../model/db_park')
const db_country = require('../model/db_country')
const db_character = require('../model/db_characters')
const db_attraction = require('../model/db_attraction')
const db_type = require('../model/db_type')

/* return error function */
function returnError(res, error, code, message, params) {
    res.status(error).json({
        parameters: params,
        error: {
            status: error,
            code: code,
            message: message
        }
    })
}

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

/* API GET - Pins list */
router.get('/api/pins', (req, res) => {
    let params = {
        limit: 50,
        offset: 0,
        from_release_date: null,
        until_release_date: null,
        min_edition_number: null,
        max_edition_number: null,
        type_id: null,
        series_id: null,
        park_id: null,
        country_id: null
    }

    try {
        let limit = req.header('limit')
        if(limit) {
            limit = Number(limit)
            if(!Number.isInteger(limit)) return returnError(res, 400, 'invalid_limit', 'limit parameter must be an integer', params)
            else if(limit < 1) return returnError(res, 400, 'invalid_limit', 'limit parameter must be greater than or equal to 1', params)
            else params.limit = limit
        }

        let offset = req.header('offset')
        if(offset) {
            offset = Number(offset)
            if(!Number.isInteger(offset)) return returnError(res, 400, 'invalid_offset', 'offset parameter must be an integer', params)
            else if(offset < 0) return returnError(res, 400, 'invalid_offset', 'offset parameter must be greater than or equal to 0', params)
            else params.offset = offset
        }

        if(req.header('from_release_date')) {
            if(Date.parse(req.header('from_release_date'))) params.from_release_date = req.header('from_release_date')
            else return returnError(res, 400, 'invalid_from_release_date', 'invalide date for from_release_date parameter', params)
        }

        if(req.header('until_release_date')) {
            if(Date.parse(req.header('until_release_date'))) params.until_release_date = req.header('until_release_date')
            else return returnError(res, 400, 'invalid_until_release_date', 'invalide date for until_release_date parameter', params)
        }

        let min_edition_number = req.header('min_edition_number')
        if(min_edition_number) {
            min_edition_number = Number(min_edition_number)
            if(!Number.isInteger(min_edition_number)) return returnError(res, 400, 'invalid_min_edition_number', 'min_edition_number parameter must be an integer', params)
            else if(min_edition_number < 1) return returnError(res, 400, 'invalid_min_edition_number', 'min_edition_number parameter must be greater than or equal to 1', params)
            else params.min_edition_number = min_edition_number
        }

        let max_edition_number = req.header('max_edition_number')
        if(max_edition_number) {
            max_edition_number = Number(max_edition_number)
            if(!Number.isInteger(max_edition_number)) return returnError(res, 400, 'invalid_max_edition_number', 'max_edition_number parameter must be an integer', params)
            else if(max_edition_number < 1) return returnError(res, 400, 'invalid_max_edition_number', 'max_edition_number parameter must be greater than or equal to 1', params)
            else params.max_edition_number = max_edition_number
        }

        let type_id = req.header('type_id')
        if(type_id) {
            type_id = Number(type_id)
            if(!Number.isInteger(type_id)) return returnError(res, 400, 'invalid_type_id', 'type_id parameter must be an integer', params)
            else if(type_id < 1) return returnError(res, 400, 'invalid_type_id', 'type_id parameter must be greater than or equal to 1', params)
            else params.type_id = type_id
        }

        let series_id = req.header('series_id')
        if(series_id) {
            series_id = Number(series_id)
            if(!Number.isInteger(series_id)) return returnError(res, 400, 'invalid_series_id', 'series_id parameter must be an integer', params)
            else if(series_id < 1) return returnError(res, 400, 'invalid_series_id', 'series_id parameter must be greater than or equal to 1', params)
            else params.series_id = series_id
        }

        let park_id = req.header('park_id')
        if(park_id && !series_id) {
            park_id = Number(park_id)
            if(!Number.isInteger(park_id)) return returnError(res, 400, 'invalid_park_id', 'park_id parameter must be an integer', params)
            else if(park_id < 1) return returnError(res, 400, 'invalid_park_id', 'park_id parameter must be greater than or equal to 1', params)
            else params.park_id = park_id
        }

        let country_id = req.header('country_id')
        if(country_id && !park_id && !series_id) {
            country_id = Number(country_id)
            if(!Number.isInteger(country_id)) return returnError(res, 400, 'invalid_country_id', 'country_id parameter must be an integer', params)
            else if(country_id < 1) return returnError(res, 400, 'invalid_country_id', 'country_id parameter must be greater than or equal to 1', params)
            else params.country_id = country_id
        }
    } catch (e) {
        return returnError(res, 500, 'parameters_error', 'an error occurred while processing parameters', params)
    }

    db_pins.getPinsList(params.limit, params.offset, params.from_release_date, params.until_release_date, params.min_edition_number, params.max_edition_number, params.type_id, params.series_id, params.park_id, params.country_id).then(result => {
        res.json({
            parameters: params,
            nb_result: (result) ? result.length : 0,
            result: (result) ? result : []
        })
    }).catch(() => returnError(res, 500, "database_error", "an error occurred during the request to the database", params))
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