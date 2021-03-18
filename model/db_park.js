const db_model = require('./db')
const {QueryTypes} = require("sequelize")

exports.getParkList = async () => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select p.id, p.name from park p`, {type: QueryTypes.SELECT})
        .then(r => {
            result = r
        })

    return result
}

exports.getFullParkById = async (id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select p.id, p.name, count(DISTINCT s.id) as 'nb_series', count(DISTINCT pins.id) as 'nb_pins', count(DISTINCT a.id) as 'nb_attractions', c.id as 'country.id', c.name as 'country.name'
                            from park p
                            inner join country c on p.country_id = c.id
                            left join serie s on s.park_id = p.id
                            left join pins on s.id = pins.serie_id
                            left join attraction a on p.id = a.park_id
                            where p.id = :id
                            group by p.id`,
                            {type: QueryTypes.SELECT, replacements: {id: id}, nest: true})
        .then(r => {
            result = r[0]
        })

    return result
}