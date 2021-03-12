const db_model = require('./db')
const {QueryTypes} = require("sequelize")

exports.getApplicationListForAccountId = async (id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select id, name, description, apiToken, account_id from application where account_id = :id`, {type: QueryTypes.SELECT, replacements: {id: id}})
        .then(r => {
            result = r
        })

    return result
}

exports.addApplication = async (name, description, apiToken, account_id) => {
    let result = false
    let database = db_model.getDatabase()

    await database.query(`insert into application (name, description, apiToken, account_id) VALUE (:name, :description, :apiToken, :account_id)`, {type: QueryTypes.INSERT, replacements: {name: name, description: description, apiToken: apiToken, account_id: account_id}})
        .then(() => {
            result = true
        })

    return result
}

exports.removeApplication = async (id) => {
    let result = false
    let database = db_model.getDatabase()

    await database.query(`delete from application where id = :id`, {type: QueryTypes.DELETE, replacements: {id: id}})
        .then(() => {
            result = true
        })

    return result
}

exports.getApplicationTokenById = async (id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select id, apiToken from application where id = :id`, {type: QueryTypes.SELECT, replacements: {id: id}})
        .then(r => {
            result = r[0]
        })

    return result
}