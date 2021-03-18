const db_model = require('./db')
const {QueryTypes} = require("sequelize")

exports.getFullCountryById = async (id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select c.id, c.name, count(DISTINCT p.id) as 'nb_park', count(DISTINCT s.id) as 'nb_series', count(DISTINCT pins.id) as 'nb_pins', count(DISTINCT a.id) as 'nb_attractions'
                            from country c
                            left join park p on c.id = p.country_id
                            left join serie s on p.id = s.park_id
                            left join pins on s.id = pins.serie_id
                            left join attraction a on p.id = a.park_id
                            where c.id = :id
                            group by c.id`,
                            {type: QueryTypes.SELECT, replacements: {id: id}, nest: true})
        .then(r => {
            result = r[0]
        })

    return result
}