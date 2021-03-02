const db_model = require('./db')
const {QueryTypes} = require("sequelize")

exports.getLastContributionsFromUserId = async (id, nbContrib) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select uni.name, uni.type, u.pseudo, uni.contribution_date
                        from user u
                        inner join (
                            select p.name, 'pins' as type, pc.contributor_id, pc.contribution_date
                            from pins_contributor pc
                            inner join pins p on pc.pins_id = p.id
                        
                            union all
                        
                            select s.name, 'serie' as type, sc.contributor_id, sc.contribution_date
                            from serie_contributor sc
                            inner join serie s on sc.serie_id = s.id
                            ) as uni
                        on uni.contributor_id = u.id
                        where u.id = :id
                        order by uni.contribution_date desc
                        limit :nbContrib`, {type: QueryTypes.SELECT, replacements: {id: id, nbContrib: nbContrib}})
        .then(r => {
            result = r
        })
    return result
}

exports.getLastContributions = async (nbContrib) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select uni.name, uni.type, u.pseudo, uni.contribution_date
                        from user u
                        inner join (
                            select p.name, 'pins' as type, pc.contributor_id, pc.contribution_date
                            from pins_contributor pc
                            inner join pins p on pc.pins_id = p.id
                        
                            union all
                        
                            select s.name, 'serie' as type, sc.contributor_id, sc.contribution_date
                            from serie_contributor sc
                            inner join serie s on sc.serie_id = s.id
                            ) as uni
                        on uni.contributor_id = u.id
                        order by uni.contribution_date desc
                        limit :nbContrib`, {type: QueryTypes.SELECT, replacements: {nbContrib: nbContrib}})
        .then(r => {
            result = r
        })
    return result
}