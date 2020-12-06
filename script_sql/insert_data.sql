use dpdb;

-- -- -- Insertion des valeurs -- -- --
-- Insertion Utilisateur et account
set @user_id = insert_user('admin', 'Smith', 'John', 'exemple@dynivers.fr', '$2b$10$jPRmbWAIdNbj04xykly6d.iGr6rDUS1xyovtoJpvaEcuq7JMWLU82');
insert into Administrator (account_id) values (@user_id);
insert into Contributor (account_id) values (@user_id);
set @contributor_id = LAST_INSERT_ID();

-- Insertion Application
insert into Application (name, description, apiToken, account_id) VALUES ('App Test', 'Application de test de l\'api', 'BigT0kenS3cUrity',@user_id);

-- Insertion des pays
insert into Country (name) value ('Etat Unis'),('France'),('Japon'),('Chine');

-- Insertion Parcs Disneyland
insert into Park (name, country_id) value ('Disneyland Resort', 1);
insert into Park (name, country_id) value ('Walt Disney World Resort', 1);
insert into Park (name, country_id) value ('Disneyland Paris', 2);
insert into Park (name, country_id) value ('Tokyo Disneyland', 3);
insert into Park (name, country_id) value ('Hong Kong Disneyland', 4);
insert into Park (name, country_id) value ('Shanghai Disneyland', 4);

-- Insertion Personnage
insert into Personage (name) values ('Stitch'),('Mike'),('Sully'),('Bob'),('BayMax'),('Hero');

insert into Attraction (name, park_id) VALUES ('It\'s a small world', 3);

-- Insertion type de Pins
insert into Type (name) value ('Normal'),('Jumbo'),('Gawais');

-- Insertion collection de pins
insert into Serie (name, park_id) value ('World\'s Best Friends',3);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), @contributor_id);
insert into Serie (name, park_id) value ('Pin Trading Night',3);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), @contributor_id);
insert into Serie (name, park_id) value ('Attraction',3);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), @contributor_id);

-- Insertion pins
insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('World\'s Best Friends Mike & Sully', '2020-10-24', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Personage (pins_id, personage_id) VALUES (@pins_id,2),(@pins_id,3);
insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Best Friends BayMax & Hero', '2020-09-26', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Personage (pins_id, personage_id) VALUES (@pins_id,4),(@pins_id,5);
insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Attraction it\'s a small world', '2018-04-12', 800, 3, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Attraction (pins_id, attraction_id) values (@pins_id, 1);