const db_model = require('./db')
const {QueryTypes} = require("sequelize")

exports.getTypeList = async () => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select t.id, t.name from type t`, {type: QueryTypes.SELECT})
        .then(r => {
            result = r
        })

    return result
}

exports.getFullTypeById = async (id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select t.id, t.name, count(DISTINCT p.id) as 'nb_pins', count(DISTINCT p.serie_id) as 'nb_series'
                            from type t
                            left join pins p on t.id = p.type_id
                            where t.id = :id
                            group by t.id`,
        {type: QueryTypes.SELECT, replacements: {id: id}, nest: true})
        .then(r => {
            result = r[0]
        })

    return result
}