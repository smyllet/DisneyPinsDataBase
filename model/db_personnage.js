const db_model = require('./db')
const {QueryTypes} = require("sequelize");

exports.getPersonnageList = async () => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select p.id, p.name from personnage p`, {type: QueryTypes.SELECT})
        .then(r => {
            result = r
        })

    return result
}