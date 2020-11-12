// - - - Import Node Module - - - //
const https = require('https')
const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const fs = require('fs')

// - - - Import Config - - - //
const config = require('./config.json')

// - - - Instantiation de Express - - - //
const app = express()

// - - - Configuration du serveur WEB - - - //
app.use(express.json())
app.use(bodyparser.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'public'))) // Dossier accessible en public

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

