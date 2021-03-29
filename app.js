// - - - Import Node Module - - - //
const https = require('https')
const express = require('express')
const session = require('express-session')
const bodyparser = require('body-parser')
const path = require('path')
const fs = require('fs')

// - - - Import Config - - - //
const config = require('./function/config')()
// Stoppé l'exécution si le fichier config est manquant
if(!config) return

// - - - Instantiation de Express - - - //
const app = express()

// - - - Initialisation de la connexion à la base de donnée - - - //
require('./model/db').connexion()

// - - - Configuration du serveur WEB - - - //
app.use(express.json())
app.use(bodyparser.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'public'))) // Dossier accessible en public
app.use(session({
    secret: require('crypto').randomBytes(64).toString('hex'),
    resave: false,
    saveUninitialized: true,
    name: "dpdb-session",
    cookie: {
        secure: true,
        httpOnly: true
    }
}))
app.set('view engine', 'ejs')
app.disable('view cache')
app.set('etag', false)
app.locals = {
    lang: require('./lang.json')
}

app.set('port', config.webServer.portHttps)
const sslOption = {key: fs.readFileSync('ssl/key.pem'), cert: fs.readFileSync('ssl/cert.pem')}

// - - - Création du serveur http pour la redirection https - - - //
// Si la redirection est activé dans la config
if(config.webServer.redirect80toHttps) {
    require('http').createServer((req, res) => {
        console.log(`https://${req.headers.host}${(config.webServer.port === 443) ? '' : ':' + req.headers.host}${req.url}`)
        res.writeHead(301, {"Location": `https://${req.headers.host}${(config.webServer.portHttps === 443) ? '' : ':' + config.webServer.portHttps}${req.url}`})
        res.end()
    }).listen(80)
}

// - - - Création du serveur HTTPS - - - //
const server = https.createServer(sslOption, app)
server.listen(config.webServer.portHttps)

// - - - Serveur Event - - - //
// Quand le serveur est prêt
server.on('listening', () => {
    console.log(`Serveur prêt et à l'écoute à l'adresse ${config.webServer.address}:${config.webServer.portHttps}`)
})

// - - - Express Route - - - //
// Home page
app.use('/', require('./routes/index'))

// Login page
app.use('/', require('./routes/login'))

// Logout page
app.use('/', require('./routes/logout'))

// Register page
app.use('/', require('./routes/register'))

// Contribution page
app.use('/', require('./routes/contribution'))

// Contribute page
app.use('/', require('./routes/contribute'))

// Developer Page
app.use('/', require('./routes/getPrivilege'))

// Admin page
app.use('/', require('./routes/admin'))

// Developer page
app.use('/', require('./routes/developer'))

// API page
app.use('/', require('./routes/api'))

// Documentation Page
app.use('/', require('./routes/documentation'))