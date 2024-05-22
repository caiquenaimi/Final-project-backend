CREATE DATABASE backend_final;

\c backend_final;

CREATE TABLE musics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(100),
    duration DECIMAL(5,2)  NOT NULL,
    file VARCHAR(100) NOT NULL,
    album VARCHAR(100) NOT NULL,
    artist VARCHAR(100) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL,
    age INT
);

CREATE TABLE rtoken (
    rtoken VARCHAR(100) NOT NULL PRIMARY KEY,
    expires INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    duration DECIMAL(5,2),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    birthdate DATE NOT NULL,
    image VARCHAR(100)
);

CREATE TABLE playlist_music (
    id SERIAL PRIMARY KEY,
    playlist_id INT NOT NULL,
    music_id INT NOT NULL,
    FOREIGN KEY (playlist_id) REFERENCES playlists(id),
    FOREIGN KEY (music_id) REFERENCES musics(id)
);
