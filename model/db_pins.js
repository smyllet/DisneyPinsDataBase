const db_model = require('./db')
const {QueryTypes} = require("sequelize");

exports.createPins = async (name, release_date, edition_number, serie_id, type_id, contributor_id, personnage, attraction) => {
    let result = false
    let database = db_model.getDatabase()

    await database.query(`insert into Pins(name, release_date, edition_number, serie_id, type_id) value (:name, :release_date, :edition_number, :serie_id, :type_id)`, {type: QueryTypes.INSERT, replacements: {name: name, release_date: release_date, edition_number: edition_number, serie_id: serie_id, type_id: type_id}}).then(async () => {
        await database.query(`select LAST_INSERT_ID() as pins_id`, {type: QueryTypes.SELECT}).then(async r => {
            let pins_id = r[0].pins_id
            await database.query(`insert into Pins_Contributor (pins_id, contributor_id) values (:pins_id, :contributor_id)`, {type: QueryTypes.INSERT, replacements: {pins_id: pins_id, contributor_id: contributor_id}}).then(async () => {
                result = true
                if(personnage && (personnage.length > 0)) {
                    let valList = []
                    personnage.forEach(() => valList.push(`(${pins_id}, ?)`))
                    await database.query(`insert into Pins_Personnage (pins_id, personnage_id) VALUES ${valList.join(',')}`, {type: QueryTypes.INSERT, replacements: personnage}).catch(e => {
                        console.error(e)
                        result = false
                    })
                }

                if(attraction && (attraction.length > 0)) {
                    let valList = []
                    attraction.forEach(() => valList.push(`(${pins_id}, ?)`))
                    await database.query(`insert into Pins_Attraction (pins_id, attraction_id) VALUES ${valList.join(',')}`, {type: QueryTypes.INSERT, replacements: attraction}).catch(e => {
                        console.error(e)
                        result = false
                    })
                }
            }).catch(console.error)
        }).catch(console.error)
    }).catch(console.error)

    return result
}