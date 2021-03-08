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

exports.getAllRequestsList = async () => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select uni.id, uni.type, uni.register_date, u.pseudo, uni.status
                            from (select id, 'contributor' as type , register_date, account_id, status
                            from register_contributor rc
                            
                            union all
                            
                            select id, 'developer' as type , register_date, account_id, status
                            from register_developer rd) as uni
                            inner join user u
                            on uni.account_id = u.id
                            where uni.status < 2
                            order by uni.register_date, uni.status`,
        {type: QueryTypes.SELECT})
        .then(r => {
            result = r
        })

    return result
}

exports.getContributorRequestById = async (id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select rc.*, p.name as park_name, u.pseudo from register_contributor rc inner join user u on rc.account_id = u.id left join park p on rc.park_id = p.id where rc.id = :id`, {type: QueryTypes.SELECT, replacements: {id: id}})
        .then(r => {
            result = r[0]
        })

    return result
}

exports.getDeveloperRequestById = async (id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select rd.*, u.pseudo from register_developer rd inner join user u on rd.account_id = u.id where rd.id = :id`, {type: QueryTypes.SELECT, replacements: {id: id}})
        .then(r => {
            result = r[0]
        })

    return result
}

exports.setContributorRequestStatusById = async (id, status) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`update register_contributor set status = :status where (id=:id && status<2)`, {type: QueryTypes.UPDATE, replacements: {id: id, status: status}})
        .then(r => {
            result = true
        })

    return result
}

exports.setDeveloperRequestStatusById = async (id, status) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`update register_developer set status = :status where (id=:id && status<2)`, {type: QueryTypes.UPDATE, replacements: {id: id, status: status}})
        .then(r => {
            result = true
        })

    return result
}