use dpdb;

CREATE VIEW FULL_USER (id, pseudo, name, firstName, mail, password, isContributor, isAdmin, enable) AS
select u.id, u.pseudo, u.name, u.firstName, ac.mail, ac.password, IF(c.id is not null, true, false) as isContributor, IF(a.id is not null, true, false) as isAdmin, ac.enable
from Account ac
inner join User u on ac.id = u.id
left join contributor c on ac.id = c.account_id
left join application a on ac.id = a.account_id