const db_model = require('./db')

exports.getAttractionList = async () => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select a.id, a.name from attraction a`)
        .then(r => {
            result = r[0]
        })

    return result
}