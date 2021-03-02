const bcrypt = require('bcrypt')

const db_model = require('./db')
const {QueryTypes} = require("sequelize")
const User = require('../class/user')

exports.getUserByIdentification = async (mail, password) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select id, pseudo, name, firstName, mail, isContributor, isAdmin, password, enable from full_user
                          where mail = :mail`, {type: QueryTypes.SELECT, replacements: {mail: mail}}).then(r => {
        let user = r[0]
        if((user === undefined)) result = null
        else
        {
            let match = bcrypt.compareSync(password, user.password)
            if(match) result = new User(user.id,user.pseudo,user.name,user.firstName,user.mail,(user.isContributor === 1), (user.isAdmin === 1), (user.enable === 1))
            else result = null
        }
    })
    return result
}

exports.getUserById = async (id) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select id, pseudo, name, firstName, mail, isContributor, isAdmin, password, enable from full_user
                          where id = :id`, {type: QueryTypes.SELECT, replacements: {id: id}}).then(r => {
        let user = r[0]
        if((user === undefined)) result = null
        else result = new User(user.id,user.pseudo,user.name,user.firstName,user.mail,(user.isContributor === 1), (user.isAdmin === 1), (user.enable === 1))
    })
    return result
}

exports.checkMailAlreadyRegister = async (mail) => {
    let result = true
    let database = db_model.getDatabase()

    await database.query(`select count(*) as nb from account where mail = :mail`, {type: QueryTypes.SELECT, replacements: {mail: mail}}).then(r => {
        result = r[0].nb !== 0;
    })
    return result
}

exports.checkPseudoAlreadyRegister = async (pseudo) => {
    let result = true
    let database = db_model.getDatabase()

    await database.query(`select count(*) as nb from user where pseudo = :pseudo`, {type: QueryTypes.SELECT, replacements: {pseudo: pseudo}}).then(r => {
        result = r[0].nb !== 0;
    })
    return result
}

exports.createUser = async (pseudo, mail, firstName,name , password) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select insert_user(:pseudo, :name, :firstName, :mail, :password) as result`, {type: QueryTypes.SELECT, replacements: {pseudo: pseudo, name: name, firstName: firstName, mail: mail, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))}}).then(r => {
        result = r[0].result
    }).catch(console.error)
    return result
}