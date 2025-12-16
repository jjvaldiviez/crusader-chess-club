USE appdb;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE games;
TRUNCATE TABLE section_players;
TRUNCATE TABLE sections;
TRUNCATE TABLE tournaments;
TRUNCATE TABLE players;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO players (first_name, last_name, age, uscf_id, uscf_expiration) VALUES
('Jacob','Harris',32,'U10000001','2026-05-01'),
('Emily','Tran',27,'U10000002','2025-11-15'),
('Marcus','Lopez',19,'U10000003','2026-01-20'),
('Sophia','Kim',14,'U10000004','2025-09-10'),
('Daniel','Reeves',41,'U10000005','2026-03-30'),
('Ava','Patel',11,'U10000006','2025-12-31'),
('Liam','Bennett',22,'U10000007','2026-04-12'),
('Noah','Sullivan',35,'U10000008','2026-02-18'),
('Olivia','Morgan',16,'U10000009','2025-10-05'),
('Ethan','Price',29,'U10000010','2026-06-01'),
('Mia','Gonzalez',13,'U10000011','2025-08-20'),
('Lucas','Ramirez',18,'U10000012','2026-01-01'),
('Isabella','Carter',12,'U10000013','2025-09-30'),
('Mason','Brooks',25,'U10000014','2026-03-15'),
('Charlotte','Ward',10,'U10000015','2025-12-01'),
('Logan','Perry',33,'U10000016','2026-05-22'),
('Amelia','Foster',9,'U10000017','2025-11-01'),
('James','Howard',44,'U10000018','2026-07-10'),
('Harper','Bell',15,'U10000019','2025-10-18'),
('Elijah','Cook',31,'U10000020','2026-02-14'),
('Benjamin','Gray',38,'U10000021','2026-03-01'),
('Evelyn','Bailey',17,'U10000022','2025-09-12'),
('Henry','Rivera',28,'U10000023','2026-04-09'),
('Abigail','Cooper',14,'U10000024','2025-08-25'),
('Sebastian','Richardson',21,'U10000025','2026-01-30'),
('Ella','Cruz',13,'U10000026','2025-10-10'),
('Jack','Reed',36,'U10000027','2026-03-05'),
('Avery','Kelly',11,'U10000028','2025-12-20'),
('Alexander','Sanders',42,'U10000029','2026-06-15'),
('Scarlett','Price',9,'U10000030','2025-11-11'),
('William','Long',34,'U10000031','2026-05-05'),
('Grace','Hughes',16,'U10000032','2025-09-09'),
('Michael','Flores',23,'U10000033','2026-02-02'),
('Chloe','Myers',12,'U10000034','2025-10-22'),
('Samuel','Ford',30,'U10000035','2026-04-04'),
('Victoria','Hamilton',15,'U10000036','2025-08-08'),
('David','Graham',40,'U10000037','2026-03-03'),
('Aria','Wallace',10,'U10000038','2025-12-12'),
('Joseph','Cole',27,'U10000039','2026-01-01'),
('Lily','West',13,'U10000040','2025-09-19'),
('Owen','Jordan',20,'U10000041','2026-02-28'),
('Hannah','Owens',14,'U10000042','2025-10-30'),
('Matthew','Reynolds',26,'U10000043','2026-03-21'),
('Zoey','Fisher',11,'U10000044','2025-11-25'),
('Wyatt','Ellis',32,'U10000045','2026-04-14'),
('Nora','Harrison',12,'U10000046','2025-09-29'),
('Gabriel','Gibson',24,'U10000047','2026-01-17'),
('Riley','McDonald',10,'U10000048','2025-12-05'),
('Carter','Marshall',29,'U10000049','2026-02-11'),
('Penelope','Woods',13,'U10000050','2025-10-01'),
('Jayden','Murray',18,'U10000051','2026-03-18'),
('Layla','Freeman',9,'U10000052','2025-11-07'),
('Dylan','Wells',22,'U10000053','2026-04-01'),
('Zoey','Webb',14,'U10000054','2025-09-14'),
('Luke','Simpson',31,'U10000055','2026-02-22'),
('Aubrey','Stevens',12,'U10000056','2025-10-12'),
('Isaac','Tucker',19,'U10000057','2026-01-25'),
('Ellie','Porter',11,'U10000058','2025-12-18'),
('Grayson','Hunter',33,'U10000059','2026-03-29'),
('Addison','Hicks',13,'U10000060','2025-09-03'),
('Julian','Crawford',21,'U10000061','2026-02-07'),
('Stella','Henry',10,'U10000062','2025-11-30'),
('Levi','Boyd',28,'U10000063','2026-04-20'),
('Natalie','Mason',15,'U10000064','2025-10-27'),
('Isaiah','Morales',23,'U10000065','2026-03-11'),
('Hazel','Kennedy',12,'U10000066','2025-08-29'),
('Hudson','Warren',34,'U10000067','2026-05-12'),
('Violet','Dixon',14,'U10000068','2025-09-21'),
('Anthony','Burns',25,'U10000069','2026-01-14'),
('Aurora','Gordon',11,'U10000070','2025-12-09'),
('Thomas','Shaw',37,'U10000071','2026-03-27'),
('Savannah','Holmes',13,'U10000072','2025-10-16'),
('Charles','Rice',41,'U10000073','2026-06-02'),
('Brooklyn','Black',9,'U10000074','2025-11-19'),
('Christopher','Daniels',30,'U10000075','2026-02-05'),
('Claire','Palmer',12,'U10000076','2025-09-26'),
('Andrew','Mills',24,'U10000077','2026-01-09'),
('Skylar','Nichols',10,'U10000078','2025-12-14'),
('Joshua','Grant',35,'U10000079','2026-04-07'),
('Paisley','Knight',13,'U10000080','2025-10-03'),
('Eli','Ferguson',20,'U10000081','2026-02-19'),
('Audrey','Rose',11,'U10000082','2025-11-23'),
('Nathan','Stone',27,'U10000083','2026-03-08'),
('Lucy','Hawkins',14,'U10000084','2025-09-17'),
('Christian','Dunn',22,'U10000085','2026-01-22'),
('Bella','Perkins',12,'U10000086','2025-10-29'),
('Hunter','Hudson',29,'U10000087','2026-04-03'),
('Aaliyah','Spencer',15,'U10000088','2025-08-31'),
('Jonathan','Gardner',31,'U10000089','2026-02-16'),
('Anna','Stephens',13,'U10000090','2025-09-13'),
('Connor','Payne',18,'U10000091','2026-01-28'),
('Caroline','Pierce',10,'U10000092','2025-12-08'),
('Jeremiah','Berry',23,'U10000093','2026-03-06'),
('Madelyn','Matthews',12,'U10000094','2025-10-20'),
('Aaron','Arnold',26,'U10000095','2026-01-05'),
('Kennedy','Beck',11,'U10000096','2025-11-28'),
('Adrian','Newman',24,'U10000097','2026-02-13'),
('Sarah','Little',14,'U10000098','2025-09-24'),
('Nolan','Todd',20,'U10000099','2026-03-02'),
('Allison','Greer',13,'U10100000','2025-10-14');

INSERT INTO tournaments (name, location, description, start_date, end_date) VALUES
('Crusader Winter Open', 'Austin, TX', 'Large open tournament.', '2025-12-10', '2025-12-12'),
('Scholastic Holiday Championship', 'Round Rock, TX', 'K-12 scholastic event.', '2025-12-15', '2025-12-15');

INSERT INTO sections (tournament_id, name) VALUES
(1, 'Open'),
(1, 'U1600'),
(1, 'U1200'),
(2, 'K-12 Championship'),
(2, 'K-5 Beginner');

-- Crusader Winter Open registrations
INSERT INTO registrations (player_id, tournament_id, section_id) VALUES
(1, 1, 1),   -- Jacob Harris in Open
(2, 1, 2),   -- Emily Tran in U1600
(3, 1, 2),   -- Marcus Lopez in U1600
(4, 1, 3),   -- Sophia Kim in U1200
(5, 1, 1),   -- Daniel Reeves in Open
(6, 1, 3),   -- Ava Patel in U1200
(7, 1, 2),   -- Liam Bennett in U1600
(8, 1, 1),   -- Noah Sullivan in Open
(9, 1, 3),   -- Olivia Morgan in U1200
(10, 1, 2);  -- Ethan Price in U1600

-- Scholastic Holiday Championship registrations
INSERT INTO registrations (player_id, tournament_id, section_id) VALUES
(11, 2, 4),  -- Mia Gonzalez in K-12 Championship
(12, 2, 4),  -- Lucas Ramirez in K-12 Championship
(13, 2, 5),  -- Isabella Carter in K-5 Beginner
(14, 2, 4),  -- Mason Brooks in K-12 Championship
(15, 2, 5),  -- Charlotte Ward in K-5 Beginner
(16, 2, 4),  -- Logan Perry in K-12 Championship
(17, 2, 5),  -- Amelia Foster in K-5 Beginner
(18, 2, 4),  -- James Howard in K-12 Championship
(19, 2, 4),  -- Harper Bell in K-12 Championship
(20, 2, 5);  -- Elijah Cook in K-5 Beginner

-- Open Section (section_id = 1)
INSERT INTO games (section_id, round_number, white_player_id, black_player_id, result)
SELECT 1, 1, player_id, player_id+1, '1-0'
FROM players WHERE player_id BETWEEN 1 AND 20;

-- U1600 (section_id = 2)
INSERT INTO games (section_id, round_number, white_player_id, black_player_id, result)
SELECT 2, 1, player_id, player_id+1, '0-1'
FROM players WHERE player_id BETWEEN 21 AND 40;

-- U1200 (section_id = 3)
INSERT INTO games (section_id, round_number, white_player_id, black_player_id, result)
SELECT 3, 1, player_id, player_id+1, '0.5-0.5'
FROM players WHERE player_id BETWEEN 41 AND 60;

-- K-12 (section_id = 4)
INSERT INTO games (section_id, round_number, white_player_id, black_player_id, result)
SELECT 4, 1, player_id, player_id+1, '1-0'
FROM players WHERE player_id BETWEEN 71 AND 85;

-- K-5 (section_id = 5)
INSERT INTO games (section_id, round_number, white_player_id, black_player_id, result)
SELECT 5, 1, player_id, player_id+1, '0-1'
FROM players WHERE player_id BETWEEN 86 AND 100;
