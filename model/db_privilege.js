const db_model = require('./db')

exports.addNewContributorRequest = async (account_id, park_id, languages_speak, pass_annual, old_pins, comment) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`insert into Register_contributor (account_id, park_id, languages_speak, pass_annual, old_pins, comment) VALUE (${account_id}, ${park_id}, '${languages_speak}', ${pass_annual}, ${old_pins}, '${comment}')`)
        .then(r => {
            result = r[0][0]
        })

    return result
}

exports.getNewContributorRequestForUserId = async (id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select rc.*, p.name as park_name from register_contributor rc left join park p on rc.park_id = p.id where account_id = ${id}`)
        .then(r => {
            result = r[0][0]
        })

    return result
}

exports.addNewDeveloperRequest = async (account_id, languages_speak, country_target, comment) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`insert into Register_developer (account_id, languages_speak, country_target, comment) VALUE (${account_id}, '${languages_speak}', '${country_target}', '${comment}')`)
        .then(r => {
            result = r[0][0]
        })

    return result
}

exports.getNewDeveloperRequestForUserId = async (id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select rd.* from register_developer rd where account_id = ${id}`)
        .then(r => {
            result = r[0][0]
        })

    return result
}