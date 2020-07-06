-- Create db
create database movies_words;

-- Movies title schema
CREATE TABLE movies_details (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) UNIQUE,
    released_year YEAR(4),
    genre VARCHAR(255),
    poster VARCHAR(255),
    director VARCHAR(255),
    actors VARCHAR(255),
    metascore VARCHAR (255),
    imdb_rating DECIMAL(2,1),
    imdb_votes INT
);

-- Movies word schema
CREATE TABLE movies_word (
    id INT PRIMARY KEY AUTO_INCREMENT,
    word VARCHAR (255) NOT NULL,
    movie_id VARCHAR (255),
    upvotes int DEFAULT 0,
    FOREIGN KEY (movie_id) REFERENCES movies_details(id)
);

-- movies subtitles schema
CREATE TABLE movies_subtitles (
    movie_id VARCHAR(255),
    name VARCHAR(255),
    type VARCHAR(255),
    file_size INT
);

-- Users schema
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email_hash VARCHAR(255),
    is_Verified TINYINT(1) DEFAULT 0,
    date_registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    avatar VARCHAR(255)
);