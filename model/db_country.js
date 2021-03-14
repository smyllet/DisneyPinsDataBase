const db_model = require('./db')
const {QueryTypes} = require("sequelize")

exports.getFullCountryById = async (id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select c.id, c.name
                            from country c
                            where c.id = :id`,
                            {type: QueryTypes.SELECT, replacements: {id: id}, nest: true})
        .then(r => {
            result = r[0]
        })

    return result
}