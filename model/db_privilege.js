const db_model = require('./db')
const {QueryTypes} = require("sequelize")

exports.addNewContributorRequest = async (account_id, park_id, languages_speak, pass_annual, old_pins, comment) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`insert into Register_contributor (account_id, park_id, languages_speak, pass_annual, old_pins, comment) VALUE (:account_id, :park_id, :languages_speak, :pass_annual, :old_pins, :comment)`, {type: QueryTypes.INSERT, replacements: {account_id: account_id, park_id: park_id, languages_speak: languages_speak, pass_annual: pass_annual, old_pins: old_pins, comment: comment}})
        .then(() => {
            result = true
        })

    return result
}

exports.getNewContributorRequestForUserId = async (id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select rc.*, p.name as park_name from register_contributor rc left join park p on rc.park_id = p.id where account_id = :id`, {type: QueryTypes.SELECT, replacements: {id: id}})
        .then(r => {
            result = r[0]
        })

    return result
}

exports.addNewDeveloperRequest = async (account_id, languages_speak, country_target, comment) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`insert into Register_developer (account_id, languages_speak, country_target, comment) VALUE (:account_id, :languages_speak, :country_target, :comment)`, {type: QueryTypes.INSERT, replacements: {account_id: account_id, languages_speak: languages_speak, country_target: country_target, comment: comment}})
        .then(() => {
            result = true
        })

    return result
}

exports.getNewDeveloperRequestForUserId = async (id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select rd.* from register_developer rd where account_id = :id`, {type: QueryTypes.SELECT, replacements: {id: id}})
        .then(r => {
            result = r[0]
        })

    return result
}