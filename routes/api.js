const router = require('express').Router()
const reqAnalyser = require('../function/reqAnalyser')

const db_application = require('../model/db_application')
const db_pins = require('../model/db_pins')

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

/* API GET - Pins by id */
router.get('/api/pins/id/:id', (req, res) => {
    db_pins.getFullPinsById(req.params.id).then(result => {
        res.json({
            request: {
                pins_id: req.params.id
            },
            result: (result && result.id) ? result : null
        })
    }).catch(() => {
        res.status(500).json({
            request: {
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

/* API GET 404 */
router.get('/api/*', (req, res, next) => {
    res.sendStatus(404)
})

module.exports = router;