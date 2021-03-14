const db_model = require('./db')
const {QueryTypes} = require("sequelize");

function parseFullPins(pins) {
    let characters = []
    let attractions = []

    if(pins.characters_id && pins.characters_name) {
        let id_list = pins.characters_id.split(';')
        let name_list = pins.characters_name.split(';')

        id_list.forEach((id, index) => {
            let name = name_list[index]
            if(name) {
                characters.push({id: id, name: name})
            }
        })
    }

    if(pins.attractions_id && pins.attractions_name) {
        let id_list = pins.attractions_id.split(';')
        let name_list = pins.attractions_name.split(';')

        id_list.forEach((id, index) => {
            let name = name_list[index]
            if(name) {
                attractions.push({id: id, name: name})
            }
        })
    }

    pins.characters = characters
    pins.attractions = attractions

    delete pins.characters_id
    delete pins.characters_name
    delete pins.attractions_id
    delete pins.attractions_name

    return pins
}

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

    await database.query(`select p.id, p.name, p.release_date, p.edition_number, s.id as 'series.id', s.name as 'series.name', park.id as 'series.park.id', park.name as 'series.park.name', c.id as 'series.park.country.id', c.name as 'series.park.country.name', t.id as 'type.id', t.name as 'type.name', GROUP_CONCAT(ch.id SEPARATOR ';') as 'characters_id', GROUP_CONCAT(ch.name SEPARATOR ';') as 'characters_name', GROUP_CONCAT(a.id SEPARATOR ';') as 'attractions_id', GROUP_CONCAT(a.name SEPARATOR ';') as 'attractions_name'
                        from pins p 
                        inner join serie s on p.serie_id = s.id
                        inner join park on s.park_id = park.id
                        inner join country c on park.country_id = c.id
                        inner join type t on p.type_id = t.id
                        left join pins_attraction pa on p.id = pa.pins_id
                        left join attraction a on pa.attraction_id = a.id
                        left join pins_characters pc on p.id = pc.pins_id
                        left join characters ch on pc.characters_id = ch.id
                        where p.id = :id`,
                        {type: QueryTypes.SELECT, replacements: {id: id}, nest: true})
        .then(r => {
            result = parseFullPins(r[0])
        })

    return result
}