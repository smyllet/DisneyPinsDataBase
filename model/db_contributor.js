const db_model = require('./db')
const {QueryTypes} = require("sequelize")

exports.setNewContributorWithRequestId = async (request_id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`insert into contributor (account_id) select account_id from register_contributor where id = :request_id`, {type: QueryTypes.INSERT, replacements: {request_id: request_id}})
        .then(() => {
            result = true
        })

    return result
}