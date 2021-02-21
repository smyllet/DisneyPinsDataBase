const db_model = require('./db')

exports.createPins = async (name, release_date, edition_number, serie_id, type_id, contributor_id, personnage, attraction) => {
    let result = false
    let database = db_model.getDatabase()

    await database.query(`insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('${name}', '${release_date}', ${edition_number}, ${serie_id}, ${type_id})`).then(async r => {
        await database.query(`select LAST_INSERT_ID() as pins_id`).then(async r => {
            let pins_id = r[0][0].pins_id
            await database.query(`insert into Pins_Contributor (pins_id, contributor_id) values (${pins_id}, ${contributor_id})`).then(async r => {
                result = true
                if(personnage && (personnage.length > 0)) {
                    let valList = []
                    personnage.forEach(p => valList.push(`(${pins_id}, ${p})`))
                    await database.query(`insert into Pins_Personnage (pins_id, personnage_id) VALUES ${valList.join(',')}`).catch(e => {
                        console.error(e)
                        result = false
                    })
                }

                if(attraction && (attraction.length > 0)) {
                    let valList = []
                    attraction.forEach(a => valList.push(`(${pins_id}, ${a})`))
                    await database.query(`insert into Pins_Attraction (pins_id, attraction_id) VALUES ${valList.join(',')}`).catch(e => {
                        console.error(e)
                        result = false
                    })
                }
            }).catch(console.error)
        }).catch(console.error)
    }).catch(console.error)

    return result
}