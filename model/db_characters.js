const db_model = require('./db')
const {QueryTypes} = require("sequelize");

exports.getCharactersList = async () => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select c.id, c.name from characters c`, {type: QueryTypes.SELECT})
        .then(r => {
            result = r
        })

    return result
}

exports.getFullCharacterById = async (id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select c.id, c.name, count(p.id) as 'nb_pins', count(DISTINCT p.serie_id) as 'nb_series'
                            from characters c
                            left join pins_characters pc on pc.characters_id = c.id
                            left join pins p on p.id = pc.pins_id
                            where c.id = :id
                            group by c.id`,
                            {type: QueryTypes.SELECT, replacements: {id: id}, nest: true})
        .then(r => {
            result = r[0]
        })

    return result
}