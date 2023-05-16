DROP TABLE IF EXISTS topmovies;
CREATE TABLE IF NOT EXISTS topmovies(
id SERIAL PRIMARY KEY ,
title varchar(1000),
releasedate varchar(1000),
posterpath varchar(1000),
overview varchar(1000),
comment varchar(1000)
);

