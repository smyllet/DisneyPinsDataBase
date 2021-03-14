-- Insertion Application
insert into Application (name, description, apiToken, account_id) VALUES ('App Test', 'Application de test de l\'api', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQXBwIFRlc3QiLCJwc2V1ZG8iOiJhZG1pbiIsImRhdGUiOiIxNjE1NTU4MDczMTUzIiwiaWF0IjoxNjE1NTU4MDczfQ.8t4-VEjeCrhgQPuD3q9gt32epR0Agl7_BOf44KlrhAE',1);

-- Insertion Characters
insert into Characters (name) values ('Stitch'),('Sully'),('Bob'),('BayMax'),('Hiro'),('Mowgli'),('Baloo'),('Hercules'),('Pegasus'),('Gus'),('Jaq'),('Tarzan'),('Tok'),('Genie'),('Aladdin'),('Ariel'),('Polochon'),('Dumbo'),('Timothee'),('Bambi'),('PanPan'),('Tic'),('Tac'),('Timon'),('Pumba'),('Roxe'),('Rouky'),('Buzz'),('Woody'),('Raiponce'),('Pascal'),('Mulan'),('Mushu'),('Judy'),('Jack Skellington'),('Sally'),('Mickey'),('Lili'),('Clochette'),('Wendy'),('Dormousse'),('Blanche'),('Rouge'),('Violette'),('Pongo'),('Cheshire'),('Jiminy Cricket'),('Simba'),('Maléfique'),('Dory'),('Olaf'),('Lucky'),('Bossu'),('Tick-Tock');

-- Insertion Attraction
insert into Attraction (name, park_id) VALUES ('It\'s a small world', 3), ('Big Thunder Mountain', 3), ('Disneyland Railroad', 3), ('Phantom Manor', 3), ('Thunder Mesa Riverboat', 3),('Indiana Jones et le Temple du Péril', 3), ('La Cabane des Robinson', 3), ('Le Passage Enchanté d’Aladdin', 3), ('Pirates of the Caribbean', 3), ('Peter Pan’s Flight', 3), ('Alice’s Curious Labyrinth', 3), ('Blanche-Neige et les Sept Nains', 3), ('Casey Jr. – le Petit Train du Cirque', 3), ('Dumbo the Flying elephant', 3), ('Le Carrousel de Lancelot', 3), ('Le Château de la Belle au Bois Dormant', 3), ('Les Voyages de Pinocchio', 3), ('Le Pays des Contes de Fées', 3), ('Mad Hatter’s Tea Cups', 3), ('Meet Mickey Mouse', 3), ('Pavillon des Princesses', 3), ('Autopia', 3), ('Buzz Lightyear Laser Blast', 3), ('Les Mystères du Nautilus', 3), ('Orbitron', 3), ('Star Tours', 3), ('Space Mountain', 3), ('Cars Quatre Roues Rallye', 3), ('Crush’s Coaster', 3), ('Les Tapis Volants – Flying Carpets Over Agrabah', 3), ('Toy Soldiers Parachute Drop', 3), ('Ratatouille : L’Aventure Totalement Toquée de Remy', 3), ('RC Racer', 3), ('Slinky Dog Zigzag Spin', 3), ('Disney Junior Live', 3), ('CinéMagique', 3), ('Stitch Live', 3), ('Studio Tram Tour : Behind the Magic', 3), ('The Twilight Zone Tower of Terror', 3), ('Armageddon : les Effets Spéciaux', 3), ('Moteurs… Action! Stunt Show Spectacular', 3), ('Rock ’n’ Roller Coaster avec Aerosmith', 3);

-- Insertion collection de pins
insert into Serie (name, park_id) value ('World\'s Best Friends',3);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), 1);

insert into Serie (name, park_id) value ('Profile',1);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), 1);

insert into Serie (name, park_id) value ('Hors Série',3);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), 1);

insert into Serie (name, park_id) value ('Soirée',3);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), 1);

insert into Serie (name, park_id) value ('Eleonore Bridge',3);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), 1);

insert into Serie (name, park_id) value ('Pin Trading Night',3);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), 1);

insert into Serie (name, park_id) value ('Pin Trading Day',3);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), 1);

insert into Serie (name, park_id) value ('Bonne Fête Papa',3);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), 1);

insert into Serie (name, park_id) value ('Médaille',3);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), 1);

insert into Serie (name, park_id) value ('Etoile',3);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), 1);

insert into Serie (name, park_id) value ('Cast Member',3);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), 1);

insert into Serie (name, park_id) value ('Bonne Année',3);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), 1);

insert into Serie (name, park_id) value ('Stitch Zoodiaque',3);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), 1);

insert into Serie (name, park_id) value ('Stitch Invasion',3);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), 1);

insert into Serie (name, park_id) value ('Cursive Cuties',1);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), 1);

insert into Serie (name, park_id) value ('Fun Adventure',3);
insert into Serie_Contributor (serie_id, contributor_id) VALUES (last_insert_id(), 1);

-- Insertion pins
insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('World\'s Best Friends Mike & Sully', '2020-10-24', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,3),(@pins_id,2);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('World\'s Best Friends Mowgli & Baloo', '2018-12-15', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,6),(@pins_id,7);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('World\'s Best Friends Hercules & Pegasus', '2019-01-12', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,8),(@pins_id,9);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('World\'s Best Friends Gus & Jack', '2019-02-16', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,10),(@pins_id,11);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('World\'s Best Friends Tarzan & Tok', '2019-03-16', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,12),(@pins_id,13);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('World\'s Best Friends Genie & Aladdin', '2019-04-13', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,14),(@pins_id,15);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('World\'s Best Friends Ariel & Polochon', '2019-05-11', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,16),(@pins_id,17);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('World\'s Best Friends Dumbo & Timothee', '2019-06-22', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,18),(@pins_id,19);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('World\'s Best Friends Bambi & PanPan', '2019-07-20', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,20),(@pins_id,21);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('World\'s Best Friends Tic & Tac', '2019-08-17', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,22),(@pins_id,23);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('World\'s Best Friends Timon & Pumba', '2019-09-14', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,24),(@pins_id,25);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('World\'s Best Friends Roxe & Rouky', '2019-10-12', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,26),(@pins_id,27);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('World\'s Best Friends Buzz & Woody', '2019-11-16', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,28),(@pins_id,29);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('World\'s Best Friends Raiponce & Pascal', '2020-01-04', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,30),(@pins_id,31);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('World\'s Best Friends Mulan & Mushu', '2020-02-15', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,32),(@pins_id,33);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('World\'s Best Friends Hiro & BayMax', '2020-09-26', 700, 1, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,4),(@pins_id,5);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Profile WDI Judy', '2018-05-14', 250, 2, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,34);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('NBC Jack 25e', '2018-10-13', 700, 3, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,35);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('NBC Coeur 25e', '2018-10-13', 700, 3, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,35), (@pins_id, 36);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('MK 18 November', '2018-11-18', 700, 3, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,37);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Eléonore Bridge Lili', '2019-10-21', 400, 5, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,38);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Eléonore Bridge Siren', '2019-10-21', 400, 5, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Eléonore Bridge Clochette', '2019-10-21', 400, 5, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,39);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Eléonore Bridge Wendy', '2019-10-21', 400, 5, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,40);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Eléonore Bridge Dormousse', '2018-06-09', 400, 5, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,41);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Eléonore Bridge Blanche', '2018-06-09', 400, 5, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,42);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Eléonore Bridge Rouge', '2018-06-09', 400, 5, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,43);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Eléonore Bridge Violette', '2018-06-09', 400, 5, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,44);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Bonne Fête Papa Pongo', '2019-06-16', 700, 8, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,45);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Medaille Mickey Sorcier', '2019-07-24', 150, 9, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,37);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Etoile Cheshire Cat', '2019-03-09', 250, 10, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,46);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Etoile Jiminy Cricket', '2019-03-09', 250, 10, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,47);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('PTN Jumbo Stitch', '2018-06-29', 400, 6, 2);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,1);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('PTN Jumbo Simba', '2019-05-31', 400, 6, 2);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,48);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('PTN Jumbo Maléfique', '2019-10-25', 400, 6, 2);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,49);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('PTN Mini Jumbo Dory', '2016-07-29', 500, 6, 4);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,50);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Cast Member PM', '2012-07-13', 2012, 11, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into pins_attraction (pins_id, attraction_id) VALUES (@pins_id,4);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Cast Member Olaf', '2014-12-09', 3014, 11, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,51);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Cast Member PanPan', '2015-04-09', 3015, 11, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,21);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Cast Member Cheshire', '2016-04-14', 3016, 11, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,46);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Cast Member Mickey 25ans', '2017-03-06', 3017, 11, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,37);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Cast Member Mickey Coco', '2018-09-04', 3018, 11, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,37);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Cast Member Lucky', '2019-02-12', 3019, 11, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,52);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Cast Member Stitch', '2019-03-26', 3019, 11, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,1);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Cast Member Génie', '2020-10-29', 3020, 11, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,14);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Cast Member Mickey Indiana Jones', '2013-07-30', 3013, 11, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,37);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Bonne Année 2004', '2003-12-21', 1200, 12, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Stitch Lion', '2011-08-13', 600, 13, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,1);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Paris Retro Bossu Notre Dame', '2014-01-04', 600, 3, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,53);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Stitch Invasion Europe', '2008-10-04', 900, 14, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,1);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('PTN Mr Crocodrile', '2019-02-22', 400, 6, 3);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,54);

insert into Pins(name, release_date, edition_number, serie_id, type_id) value ('Fun A Rock ’n’ Roller Coaster', '2018-11-17', 700, 16, 1);
set @pins_id = LAST_INSERT_ID();
insert into Pins_Contributor (pins_id, contributor_id) values (@pins_id, @contributor_id);
insert into Pins_Characters (pins_id, characters_id) VALUES (@pins_id,1);
insert into pins_attraction (pins_id, attraction_id) VALUES (@pins_id,42);