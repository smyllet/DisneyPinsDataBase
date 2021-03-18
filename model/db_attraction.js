const db_model = require('./db')
const {QueryTypes} = require("sequelize")

exports.getAttractionList = async () => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select a.id, a.name from attraction a`, {type: QueryTypes.SELECT})
        .then(r => {
            result = r
        })

    return result
}

exports.getFullAttractionById = async (id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select a.id, a.name, count(DISTINCT pins.id) as 'nb_pins', count(DISTINCT pins.serie_id) as 'nb_series', p.id as 'park.id', p.name as 'park.name', c.id as 'park.country.id', c.name as 'park.country.name'
                            from attraction a
                            inner join park p on a.park_id = p.id
                            inner join country c on p.country_id = c.id
                            left join pins_attraction pa on a.id = pa.attraction_id
                            left join pins on pa.pins_id = pins.id
                            where a.id = :id
                            group by a.id`,
        {type: QueryTypes.SELECT, replacements: {id: id}, nest: true})
        .then(r => {
            result = r[0]
        })

    return result
}