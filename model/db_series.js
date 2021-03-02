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