create database if not exists dpdb;
use dpdb;

-- -- -- Création des table -- -- --
-- Utilisateur
create table User
(
    id int primary key not null auto_increment,
    pseudo varchar(32) not null,
    name varchar(50) not null,
    firstname varchar(50) not null
);

-- Compte
create table Account
(
    id int primary key not null auto_increment,
    mail varchar(320) not null,
    password varchar(500) not null,
    enable boolean not null default true,
    foreign key (id) references User(id)
);

-- Contributeur
create table Contributor
(
    id int primary key not null auto_increment,
    account_id int not null,
    foreign key (account_id) references Account(id)
);

-- Administrateur
create table Administrator
(
    id int primary key not null auto_increment,
    account_id int not null,
    foreign key (account_id) references Account(id)
);

-- Developer
create table Developer
(
    id int primary key not null auto_increment,
    account_id int not null,
    foreign key (account_id) references Account(id)
);

-- Application
create table Application
(
    id int primary key not null auto_increment,
    name varchar(100) not null,
    description varchar(1000) not null,
    apiToken varchar(255),
    account_id int not null,
    foreign key (account_id) references Account(id)
);

-- Pays dans lesquels les parcs Disneyland ce trouve
create table Country
(
    id int primary key not null auto_increment,
    name varchar(20)
);

-- Parcs Disneyland
create table Park
(
    id int primary key not null auto_increment,
    name varchar(35),
    country_id int not null,
    foreign key (country_id) REFERENCES Country(id)
);

-- Personnage Disney
create table Characters
(
	id int auto_increment,
	name varchar(70) not null,
	primary key (id)
);



-- Attraction Disneyland
create table Attraction
(
    id int primary key not null auto_increment,
    name varchar(70) not null,
    park_id int not null,
    foreign key (park_id) REFERENCES Park(id)
);

-- Type de pins (normal, jumbo . . .)
create table Type
(
    id int primary key not null auto_increment,
    name varchar(30)
);

-- Collections de pins
create table Serie
(
    id int primary key not null auto_increment,
    name varchar(100) not null,
    park_id int not null,
    foreign key (park_id) REFERENCES Park(id)
);

-- Pins
create table Pins
(
    id int primary key not null auto_increment,
    name varchar(100) not null,
    release_date date,
    edition_number int not null,
    serie_id int,
    type_id int not null,
    foreign key (serie_id) REFERENCES Serie(id),
    foreign key (type_id) REFERENCES Type(id)
);

-- Table pour faire la liaison entre la table pins et characters
create table Pins_Characters
(
	id int auto_increment,
	pins_id int not null,
	characters_id int not null,
	primary key (id),
	foreign key (pins_id) references Pins (id),
	foreign key (characters_id) references Characters (id)
);

-- Table pour fait la liaison entre la table pins et attraction
create table Pins_Attraction
(
    id int primary key not null auto_increment,
    pins_id int not null,
    attraction_id int not null,
    foreign key (pins_id) references Pins(id),
    foreign key (attraction_id) references Attraction(id)
);

-- Table des contributeur ayant contribué à l'ajout d'un pins dans la base de donnée
create table Pins_Contributor
(
    id int primary key not null auto_increment,
    contribution_date date not null default (CURRENT_DATE), -- Mysql 8
    pins_id int not null,
    contributor_id int not null,
    foreign key (pins_id) references Pins(id),
    foreign key (contributor_id) references Contributor(id)
);

-- Table des contributeur ayant contribué à l'ajout d'une collection dans la base de donnée
create table Serie_Contributor
(
    id int primary key not null auto_increment,
    contribution_date date not null default (CURRENT_DATE), -- Mysql 8
    serie_id int not null,
    contributor_id int not null,
    foreign key (serie_id) references Serie(id),
    foreign key (contributor_id) references Contributor(id)
);

-- Demande pour devenir contributeur
create table Register_Contributor
(
    id int primary key not null auto_increment,
    register_date date not null default (CURRENT_DATE), -- Mysql 8
    account_id int not null,
    status int not null default (0),
    park_id int,
    languages_speak varchar(100),
    pass_annual boolean default (false),
    old_pins boolean default (false),
    comment longtext,
    foreign key (account_id) references Account(id),
    foreign key (park_id) references Park(id)
);

-- Demande pour devenir developer
create table Register_Developer
(
    id int primary key not null auto_increment,
    register_date date not null default (CURRENT_DATE), -- Mysql 8
    account_id int not null,
    status int not null default (0),
    languages_speak varchar(100),
    country_target varchar(100),
    comment longtext,
    foreign key (account_id) references Account(id)
);