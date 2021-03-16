# Disney Pins DataBase

Disney Pins DataBase est une API répertoriant tous les Pins des différents parcs Disneyland

## Installation
1) Renommer le fichier `config.exemple.json` en `config.json`
2) Complété le fichier `config.json` _(Les paramètres de la base de données se ferons plus bas suivant le type d'installation)_
3) Créer un repertoire SSL à la racine, puis dans ce dossier, exécuter la commande `openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out cert.pem`

### Avec Docker Compose
4) Paramètre de la base de données
   - dans le fichier `config.json`, dans database, mettre le paramètre serveur à `mysql`
   - complété les paramètres de base de données dans le fichier `docker-compose.yml` et `config.json`
5) Si les ports on été changé dans `config.json`, répercuté les changements dans le fichier `docker-compose.yml`
6) Si besoin, installé `docker` et `docker-compose` _(inclus avec docker sur windows)_
7) A la racine du projet, exécuté la commande `docker-compose up --build --force-recreate`

### Manuellement
4) Créer une base de donnée mysql8 nommée `dpdb`
5) Exécuté les scripts sql dans le dossier `script_sql` dans l'ordre suivant
   - create_tables
   - create_procedure
   - create_vues
   - insert_data
   - insert_optional_data
6) Renseigner les paramètres de base de donnée dans le fichier `config.json`
7) Si besoin, installé `node js`
8) Exécuté la commande `npm install` à la racine du projet
9) Toujours à la racine, exécuté la commande `node app.js`

## Paramètres
Les identifiants par default sont :
 - Identifiant : `exemple@dynivers.fr`
 - Mot de passe : `admin1234`
