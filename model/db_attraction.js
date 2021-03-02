const db_model = require('./db')
const {QueryTypes} = require("sequelize")

exports.getAttractionList = async () => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select a.id, a.name from attraction a`, {type: QueryTypes.SELECT})
        .then(r => {
            result = r
        })

    return result
}