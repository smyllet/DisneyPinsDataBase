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