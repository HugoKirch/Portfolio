CREATE DATABASE IF NOT EXISTS AREA;
USE AREA;

CREATE TABLE user (
  id varchar(255),
  username varchar(255),
  password varchar (255),
  email varchar(255),
  action mediumtext,
  reaction mediumtext,
  link mediumtext
);