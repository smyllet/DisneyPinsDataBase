exports.getHeadersDataFromReq = (req) => {
    let data = {}

    data.navLang = req.acceptsLanguages( 'fr', 'en')
    if(!data.navLang) data.navLang = 'fr'

    data.user = {}
    if(req.session.user)
    {
        data.user.pseudo = req.session.user.pseudo
    }
    else data.user = null

    return data
}