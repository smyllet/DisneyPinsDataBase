class User {
    // Constructor
    constructor(id, pseudo, name, firstName, mail, contributor, admin, enable) {
        this.id = id
        this.pseudo = pseudo
        this.name = name
        this.firstName = firstName
        this.mail = mail
        this.contributor = contributor
        this.admin = admin
        this.enable = enable
        this.contribution = null
    }
}


module.exports = User