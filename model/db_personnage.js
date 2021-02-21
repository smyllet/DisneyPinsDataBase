const db_model = require('./db')

exports.getPersonnageList = async () => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select p.id, p.name from personnage p`)
        .then(r => {
            result = r[0]
        })

    return result
}