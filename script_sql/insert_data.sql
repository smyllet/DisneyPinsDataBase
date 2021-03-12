use dpdb;

-- -- -- Insertion des valeurs -- -- --
-- Insertion Utilisateur et account
set @user_id = insert_user('admin', 'Smith', 'John', 'exemple@dynivers.fr', '$2b$10$jPRmbWAIdNbj04xykly6d.iGr6rDUS1xyovtoJpvaEcuq7JMWLU82');
insert into Administrator (account_id) values (@user_id);
insert into Contributor (account_id) values (@user_id);
insert into Developer (account_id) values (@user_id);
set @contributor_id = LAST_INSERT_ID();

-- Insertion des pays
insert into Country (name) value ('Etats-Unis'),('France'),('Japon'),('Chine');

-- Insertion Parcs Disneyland
insert into Park (name, country_id) value ('Disneyland Resort', 1);
insert into Park (name, country_id) value ('Walt Disney World Resort', 1);
insert into Park (name, country_id) value ('Disneyland Paris', 2);
insert into Park (name, country_id) value ('Tokyo Disneyland', 3);
insert into Park (name, country_id) value ('Hong Kong Disneyland', 4);
insert into Park (name, country_id) value ('Shanghai Disneyland', 4);

-- Insertion type de Pins
insert into Type (name) value ('Normal'),('Jumbo'),('Gaway'),('Mini Jumbo');