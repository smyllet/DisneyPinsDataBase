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

    await database.query(`select p.id, p.name, count(s.id) as 'nb_series', c.id as 'country.id', c.name as 'country.name'
                            from park p
                            inner join country c on p.country_id = c.id
                            left join serie s on s.park_id = p.id
                            where p.id = :id
                            group by p.id`,
                            {type: QueryTypes.SELECT, replacements: {id: id}, nest: true})
        .then(r => {
            result = r[0]
        })

    return result
}