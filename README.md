# Disney Pins DataBase

Disney Pins DataBase est une API répertoriant tous les Pins des différents parcs Disneyland

## Installation
1) Renommer le fichier `config.exemple.json` en `config.json`
2) Créer une base de donnée mysql nommé `dpdb`
3) Exécuté les scripts sql dans le dossier `script_sql` dans l'ordre suivant
    - create_tables
    - create_procedure
    - create_vues
    - insert_data
4) Renseigner les paramètres de base de donnée dans le fichier config
5) Exécuté la commande `node app.js` à la racine du projet