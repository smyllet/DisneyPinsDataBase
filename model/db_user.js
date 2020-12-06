const bcrypt = require('bcrypt')

const db_model = require('./db')
const User = require('../class/user')

exports.getUserByIdentification = async (mail, password) => {
    let result = null
    let database = db_model.getDatabase()

    await database.query(`select id, pseudo, name, firstName, mail, isContributor, isAdmin, password, enable from full_user
                          where mail = "${mail}"`).then(r => {
        let user = r[0][0]
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