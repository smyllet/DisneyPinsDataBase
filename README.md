# Disney Pins DataBase

Disney Pins DataBase est une API répertoriant tous les Pins des différents parcs Disneyland

## Installation
1) Renommer le fichier `config.exemple.json` en `config.json`
2) Créer une base de donnée mysql8 nommée `dpdb`
3) Exécuté les scripts sql dans le dossier `script_sql` dans l'ordre suivant
    - create_tables
    - create_procedure
    - create_vues
    - insert_data
4) Renseigner les paramètres de base de donnée dans le fichier config
5) Dans le dossier SSL, exécuter la commande `openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out cert.pem`
6) Exécuté la commande `npm install` à la racine du projet
7) Toujours à la racine, exécuté la commande `node app.js`

## Paramètres
Les identifiants par default sont :
 - Identifiant : `exemple@dynivers.fr`
 - Mot de passe : `admin1234`
