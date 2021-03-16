//const mysql = require('mysql')
const {Sequelize} = require('sequelize')

const config = require('../config.json')

// - - - Instantiation de sequelize - - - //
let database

// - - - Fonction de connexion à la base de donnée
exports.connexion = () => {
    database = new Sequelize(config.database.database, config.database.login, config.database.password, {
        host: config.database.server,
        port: config.database.port,
        dialect: config.database.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    })

    database.authenticate().then((err) => {
        console.log("Connexion à la base de donnée réussi")
    }).catch(err => {
        console.error("Erreur de connexion à la base de donnée : " + err)
        setTimeout(this.connexion, 5000)
    })
}

exports.getDatabase = () => {
    return database
}