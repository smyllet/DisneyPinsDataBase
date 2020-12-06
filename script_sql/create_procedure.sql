-- -- -- Création des fonction et procédure -- -- --
DELIMITER |

-- Fonction d'insertion utilisateur, retourne l'id de l'utilisateur --
CREATE FUNCTION insert_user (p_pseudo varchar(32), p_name varchar(50), p_firstname varchar(50), p_mail varchar(320), p_password_hash varchar(500)) returns int
BEGIN
    insert into User (pseudo, name, firstname) VALUES (p_pseudo, p_name, p_firstname);
    set @user_id = LAST_INSERT_ID();
    insert into Account (id, mail, password) VALUES (@user_id, p_mail, p_password_hash);

    return @user_id;
END |

DELIMITER ;