-- Select the database created by docker-compose
USE appdb;
-- Each user has a password.
CREATE TABLE users (
     user_id INT AUTO_INCREMENT PRIMARY KEY,
     email VARCHAR(50) UNIQUE,
     password VARCHAR(255),
     role VARCHAR(50) DEFAULT 'USER'
);
-- Each player has unique identifiers and membership info.
CREATE TABLE players (
     player_id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT,
     first_name VARCHAR(50),
     last_name VARCHAR(50),
     age INT,
     uscf_id VARCHAR(20) UNIQUE,
     uscf_expiration DATE,
     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
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

CREATE TABLE registrations (
       player_id INT,
       tournament_id INT,
       section_id INT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
       FOREIGN KEY (player_id) REFERENCES players(player_id),
       FOREIGN KEY (tournament_id) REFERENCES tournaments(tournament_id),
       FOREIGN KEY (section_id) REFERENCES sections(section_id)
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
