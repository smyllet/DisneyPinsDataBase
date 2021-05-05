const db_model = require('./db')
const {QueryTypes} = require("sequelize");

exports.getShortSeriesList = async () => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select s.id, s.name from serie s`, {type: QueryTypes.SELECT})
        .then(r => {
            result = r
        })

    return result
}

exports.getFullSeriesById = async (id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select s.id, s.name, count(pins.id) as 'nb_pins', p.id as 'park.id', p.name as 'park.name', c.id as 'park.country.id', c.name as 'park.country.name'
                            from serie s
                            inner join park p on s.park_id = p.id
                            inner join country c on p.country_id = c.id
                            left join pins on s.id = pins.serie_id
                            where s.id = :id
                            group by s.id`,
                            {type: QueryTypes.SELECT, replacements: {id: id}, nest: true})
        .then(r => {
            result = r[0]
        })

    return result
}

exports.getSeriesList = async (limit, offset, min_nb_pins, max_nb_pins, park_id, country_id, name_includes) => {
    let result = null
    let database = db_model.getDatabase()

    let condition = []
    let where = ""

    let condition2 = []
    let having = ""

    if(min_nb_pins) condition2.push('nb_pins >= :min_nb_pins')
    if(max_nb_pins) condition2.push('nb_pins <= :max_nb_pins')

    if(park_id) condition.push('p.id = :park_id')
    if(country_id) condition.push('c.id = :country_id')
    if(name_includes) condition.push('s.name LIKE :name_includes')

    if(condition.length > 0) where = `where ${condition.join(' AND ')}`
    if(condition2.length > 0) having = `having ${condition2.join(' AND ')}`

    await database.query(`select s.id, s.name, count(pins.id) as 'nb_pins', p.id as 'park.id', p.name as 'park.name', c.id as 'park.country.id', c.name as 'park.country.name'
                        from serie s
                        inner join park p on s.park_id = p.id
                        inner join country c on p.country_id = c.id
                        left join pins on s.id = pins.serie_id
                        ${where}
                        group by s.id
                        ${having}
                        limit :limit offset :offset`,
        {type: QueryTypes.SELECT, replacements: {limit: limit, offset: offset, min_nb_pins: min_nb_pins, max_nb_pins: max_nb_pins, park_id: park_id, country_id: country_id, name_includes: '%' + name_includes + '%'}, nest: true})
        .then(r => {
            result = r
        })

    return result
}