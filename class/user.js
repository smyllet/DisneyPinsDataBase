class User {
    // Constructor
    constructor(id, pseudo, name, firstName, mail, contributor, admin, enable, developer) {
        this.id = id
        this.pseudo = pseudo
        this.name = name
        this.firstName = firstName
        this.mail = mail
        this.contributor = contributor
        this.admin = admin
        this.enable = enable
        this.contribution = null
        this.developer = developer
    }
}


module.exports = User