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
                    await database.query(`insert into Pins_Characters (pins_id, characters_id) VALUES ${valList.join(',')}`, {type: QueryTypes.INSERT, replacements: personnage}).catch(e => {
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

exports.getFullPinsById = async (id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select p.id, p.name, p.release_date, p.edition_number, s.id as 'series.id', s.name as 'series.name', park.id as 'series.park.id', park.name as 'series.park.name', c.id as 'series.park.country.id', c.name as 'series.park.country.name', t.id as 'type.id', t.name as 'type.name'
                        from pins p 
                        inner join serie s on p.serie_id = s.id
                        inner join park on s.park_id = park.id
                        inner join country c on park.country_id = c.id
                        inner join type t on p.type_id = t.id
                        where p.id = :id`,
                        {type: QueryTypes.SELECT, replacements: {id: id}, nest: true})
        .then(r => {
            result = r[0]
        })

    if(result) {
        await database.query(`select c.id, c.name
                           from pins_characters pc
                           inner join characters c on pc.characters_id = c.id
                           where pc.pins_id = :id`,
            {type: QueryTypes.SELECT, replacements: {id: id}, nest: true})
            .then(r => {
                result.characters = r
            })

        await database.query(`select a.id, a.name, p.id as 'park.id', p.name as 'park.name', c.id as 'park.country.id', c.name as 'park.country.name'
                            from pins_attraction pa
                            inner join attraction a on pa.attraction_id = a.id
                            inner join park p on a.park_id = p.id
                            inner join country c on p.country_id = c.id
                            where pa.pins_id = :id`,
            {type: QueryTypes.SELECT, replacements: {id: id}, nest: true})
            .then(r => {
                result.attractions = r
            })
    }

    return result
}

exports.getPinsList = async (limit, offset, from_release_date, until_release_date, min_edition_number, max_edition_number, type_id, series_id, park_id, country_id, name_includes) => {
    let result = null
    let database = db_model.getDatabase()

    let condition = []
    let where = ""

    if(from_release_date) condition.push('p.release_date >= :from_release_date')
    if(until_release_date) condition.push('p.release_date <= :until_release_date')
    if(min_edition_number) condition.push('p.edition_number >= :min_edition_number')
    if(max_edition_number) condition.push('p.edition_number <= :max_edition_number')
    if(type_id) condition.push('t.id = :type_id')
    if(series_id) condition.push('s.id = :series_id')
    if(park_id) condition.push('park.id = :park_id')
    if(country_id) condition.push('c.id = :country_id')
    if(name_includes) condition.push('p.name LIKE :name_includes')

    if(condition.length > 0) where = `where ${condition.join(' AND ')}`

    await database.query(`select p.id, p.name, p.release_date, p.edition_number, s.id as 'series.id', s.name as 'series.name', park.id as 'series.park.id', park.name as 'series.park.name', c.id as 'series.park.country.id', c.name as 'series.park.country.name', t.id as 'type.id', t.name as 'type.name'
                        from pins p 
                        inner join serie s on p.serie_id = s.id
                        inner join park on s.park_id = park.id
                        inner join country c on park.country_id = c.id
                        inner join type t on p.type_id = t.id
                        ${where}
                        limit :limit offset :offset`,
        {type: QueryTypes.SELECT, replacements: {limit: limit, offset: offset, from_release_date: from_release_date, until_release_date: until_release_date, min_edition_number: min_edition_number, max_edition_number: max_edition_number, type_id: type_id, series_id: series_id, park_id: park_id, country_id: country_id, name_includes: '%' + name_includes + '%'}, nest: true})
        .then(r => {
            result = r
        })

    return result
}