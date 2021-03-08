exports.getHeadersDataFromReq = (req) => {
    let data = {}

    data.navLang = req.acceptsLanguages( 'fr', 'en')
    if(!data.navLang) data.navLang = 'fr'

    data.user = {}
    if(req.session.user)
    {
        data.user.id = req.session.user.id
        data.user.pseudo = req.session.user.pseudo
        data.user.contributor = req.session.user.contributor
        data.user.admin = req.session.user.admin
        data.user.developer = req.session.user.developer
    }
    else data.user = null

    return data
}