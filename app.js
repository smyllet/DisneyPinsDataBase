// - - - Import Node Module - - - //
const https = require('https')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
const path = require('path')
const fs = require('fs')

// - - - Import Config - - - //
const config = require('./config.json')

// - - - Instantiation de Express - - - //
const app = express()

// - - - Initialisation de la connexion à la base de donnée - - - //
require('./model/db').connexion()

// - - - Configuration du serveur WEB - - - //
app.use(express.json())
app.use(bodyparser.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'public'))) // Dossier accessible en public
app.use(session({
    secret: "c'est secret",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}))
app.set('view engine', 'ejs')
app.disable('view cache')
app.set('etag', false)
app.locals = {
    lang: require('./lang.json')
}

app.set('port', config.webServer.port)
const sslOption = {key: fs.readFileSync('ssl/key.pem'), cert: fs.readFileSync('ssl/cert.pem')}

// - - - Création du serveur HTTPS - - - //
const server = https.createServer(sslOption, app)
server.listen(config.webServer.port)

// - - - Serveur Event - - - //
// Quand le serveur est prêt
server.on('listening', () => {
    console.log(`Serveur prêt et à l'écoute à l'adresse ${config.webServer.address}:${config.webServer.port}`)
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