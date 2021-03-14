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

    await database.query(`select c.id, c.name
                            from characters c
                            where c.id = :id`,
                            {type: QueryTypes.SELECT, replacements: {id: id}, nest: true})
        .then(r => {
            result = r[0]
        })

    return result
}