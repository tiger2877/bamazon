-- Drops the animals_db if it exists currently --
DROP DATABASE IF EXISTS seinfield_db;
-- Creates the "animals_db" database --
CREATE DATABASE seinfield_db;

-- Create the table actors.
CREATE TABLE actors (
  id int AUTO_INCREMENT,
  actor_name varchar(30) NOT NULL,
  coolness_points int NOT NULL,
  attitude varchar(60) NOT NULL,
  PRIMARY KEY(id)
);

-- Insert a set of records.
INSERT INTO actors (name, coolness_points, attitude) VALUES ("Jerry", 90, "relaxed");
INSERT INTO actors (name, coolness_points, attitude) VALUES ("Elaine", 80, "righteous");
INSERT INTO actors (name, coolness_points, attitude) VALUES ("Kramer", 20, "doofus");
INSERT INTO actors (name, coolness_points, attitude) VALUES ("George", 70, "selfish");
