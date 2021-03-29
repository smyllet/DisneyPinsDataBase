const fs = require('fs')
const yaml = require('js-yaml')

let config = null

module.exports = () => {
    if(!config) {
        try {
            let fileContent = fs.readFileSync(`${__dirname}/../config.yaml`, 'utf-8')
            config = yaml.load(fileContent)
        } catch (e) {
            console.error("Fichier config manquant, pensez à renommer le fichier 'config.exemple.yaml' en 'config.yaml'")
            config = null
        }
    }

    return config
}