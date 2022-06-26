CREATE TABLE if NOT exists users (
    id SERIAL PRIMARY KEY,
    username varchar(100) NOT NULL,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    password_digest VARCHAR NOT NULL
);