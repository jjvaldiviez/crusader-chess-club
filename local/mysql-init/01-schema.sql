-- Select the database created by docker-compose
USE appdb;

-- Each player has unique identifiers and membership info.
CREATE TABLE players (
     player_id INT AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR(50),
     last_name VARCHAR(50),
     age INT,
     uscf_id VARCHAR(20) UNIQUE,
     uscf_expiration DATE
);

-- A tournament can have multiple sections.
CREATE TABLE tournaments (
     tournament_id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100),
     location VARCHAR(100),
     description TEXT,
     start_date DATE,
     end_date DATE
);

-- Each tournament is divided into sections (e.g., Open, U2000, Scholastic).
CREATE TABLE sections (
      section_id INT AUTO_INCREMENT PRIMARY KEY,
      tournament_id INT,
      name VARCHAR(100),
      FOREIGN KEY (tournament_id) REFERENCES tournaments(tournament_id)
);

-- Each game belongs to a section and has 2 players + results.
CREATE TABLE games (
       game_id INT AUTO_INCREMENT PRIMARY KEY,
       section_id INT,
       round_number INT,
       white_player_id INT,
       black_player_id INT,
       result ENUM('1-0','0-1','0.5-0.5'), -- win/loss/draw
       FOREIGN KEY (section_id) REFERENCES sections(section_id),
       FOREIGN KEY (white_player_id) REFERENCES players(player_id),
       FOREIGN KEY (black_player_id) REFERENCES players(player_id)
);
