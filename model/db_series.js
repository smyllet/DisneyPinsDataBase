const db_model = require('./db')
const {QueryTypes} = require("sequelize");

exports.getSeriesList = async () => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select s.id, s.name from serie s`, {type: QueryTypes.SELECT})
        .then(r => {
            result = r
        })

    return result
}

exports.getFullSeriesById = async (id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select s.id, s.name, count(pins.id) as 'nb_pins', p.id as 'park.id', p.name as 'park.name', c.id as 'park.country.id', c.name as 'park.country.name'
                            from serie s
                            inner join park p on s.park_id = p.id
                            inner join country c on p.country_id = c.id
                            left join pins on s.id = pins.serie_id
                            where s.id = :id
                            group by s.id`,
                            {type: QueryTypes.SELECT, replacements: {id: id}, nest: true})
        .then(r => {
            result = r[0]
        })

    return result
}