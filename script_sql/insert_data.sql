use dpdb;

-- -- -- Insertion des valeurs -- -- --
-- Insertion Utilisateur et account
set @user_id = insert_user('admin', 'Smith', 'John', 'exemple@dynivers.fr', '$2b$10$jPRmbWAIdNbj04xykly6d.iGr6rDUS1xyovtoJpvaEcuq7JMWLU82');
insert into Administrator (account_id) values (@user_id);
insert into Contributor (account_id) values (@user_id);
insert into Developer (account_id) values (@user_id);
set @contributor_id = LAST_INSERT_ID();

-- Insertion Application
insert into Application (name, description, apiToken, account_id) VALUES ('App Test', 'Application de test de l\'api', 'BigT0kenS3cUrity',@user_id);

-- Insertion des pays
insert into Country (name) value ('Etats-Unis'),('France'),('Japon'),('Chine');

-- Insertion Parcs Disneyland
insert into Park (name, country_id) value ('Disneyland Resort', 1);
insert into Park (name, country_id) value ('Walt Disney World Resort', 1);
insert into Park (name, country_id) value ('Disneyland Paris', 2);
insert into Park (name, country_id) value ('Tokyo Disneyland', 3);
insert into Park (name, country_id) value ('Hong Kong Disneyland', 4);
insert into Park (name, country_id) value ('Shanghai Disneyland', 4);

-- Insertion Personnage
insert into Personnage (name) values ('Stitch'),('Mike'),('Sully'),('Bob'),('BayMax'),('Hero');

insert into Attraction (name, park_id) VALUES ('It\'s a small world', 3), ('Big Thunder Mountain', 3), ('Disneyland Railroad', 3), ('Phantom Manor', 3), ('Thunder Mesa Riverboat', 3),('Indiana Jones et le Temple du Péril', 3), ('La Cabane des Robinson', 3), ('Le Passage Enchanté d’Aladdin', 3), ('Pirates of the Caribbean', 3), ('Peter Pan’s Flight', 3), ('Alice’s Curious Labyrinth', 3), ('Blanche-Neige et les Sept Nains', 3), ('Casey Jr. – le Petit Train du Cirque', 3), ('Dumbo the Flying elephant', 3), ('Le Carrousel de Lancelot', 3), ('Le Château de la Belle au Bois Dormant', 3), ('Les Voyages de Pinocchio', 3), ('Le Pays des Contes de Fées', 3), ('Mad Hatter’s Tea Cups', 3), ('Meet Mickey Mouse', 3), ('Pavillon des Princesses', 3), ('Autopia', 3), ('Buzz Lightyear Laser Blast', 3), ('Les Mystères du Nautilus', 3), ('Orbitron', 3), ('Star Tours', 3), ('Space Mountain', 3), ('Cars Quatre Roues Rallye', 3), ('Crush’s Coaster', 3), ('Les Tapis Volants – Flying Carpets Over Agrabah', 3), ('Toy Soldiers Parachute Drop', 3), ('Ratatouille : L’Aventure Totalement Toquée de Remy', 3), ('RC Racer', 3), ('Slinky Dog Zigzag Spin', 3), ('Disney Junior Live', 3), ('CinéMagique', 3), ('Stitch Live', 3), ('Studio Tram Tour : Behind the Magic', 3), ('The Twilight Zone Tower of Terror', 3), ('Armageddon : les Effets Spéciaux', 3), ('Moteurs… Action! Stunt Show Spectacular', 3), ('Rock ’n’ Roller Coaster avec Aerosmith', 3);

-- Insertion type de Pins
insert into Type (name) value ('Normal'),('Jumbo'),('Gaway'),('Mini Jumbo');

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
insert into Pins_Personnage (pins_id, personnage_id) VALUES (@pins_id,2),(@pins_id,3);
insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Best Friends BayMax & Hero', '2020-09-26', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Personnage (pins_id, personnage_id) VALUES (@pins_id,4),(@pins_id,5);
insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Attraction it\'s a small world', '2018-04-12', 800, 3, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Attraction (pins_id, attraction_id) values (@pins_id, 1);