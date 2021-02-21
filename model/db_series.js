const db_model = require('./db')

exports.getSeriesList = async () => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select s.id, s.name from serie s`)
        .then(r => {
            result = r[0]
        })

    return result
}