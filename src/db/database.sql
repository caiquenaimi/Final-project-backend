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

INSERT INTO musics (name, image, duration, file, album, artist) VALUES
('Conexões de Máfia', 'https://i.imgur.com/2j72flL.jpg', 221, 'conexoes.MP3', 'Conexões de Máfia', 'Matuê, Rich The Kid'),
('Máquina do Tempo', 'https://i.imgur.com/KhlzAL1.jpg', 230, 'maquina.MP3', 'Máquina do Tempo', 'Matuê'),
('777-666', 'https://i.imgur.com/KhlzAL1.jpg', 164, '777-666.MP3', 'Máquina do Tempo', 'Matuê'),
('Gorila Roxo', 'https://i.imgur.com/KhlzAL1.jpg', 165, 'gorilaroxo.MP3', 'Máquina do Tempo', 'Matuê'),
('É sal', 'https://i.imgur.com/KhlzAL1.jpg', 157, 'sal.MP3', 'Máquina do Tempo', 'Matuê'),
('Lama no Copo', 'https://i.imgur.com/KnjRP9I.jpg', 250, 'lamanocopo.MP3', 'Lama no Copo', 'Matuê'),
('Anos Luz', 'https://i.imgur.com/otiA3P6.jpg', 264, 'anosluz.MP3', 'Anos Luz', 'Matuê'),
('Quer Voar', 'https://i.imgur.com/4PDeaJn.jpg', 271, 'quervoar.MP3', 'Quer Voar', 'Matuê'),
('Luxuria', 'https://i.imgur.com/ZIlal0I.jpg', 185, 'luxuria.MP3', 'Luxuria', 'Matuê, Xamã'),
('Vampiro', 'https://i.imgur.com/TRKwLvt.jpg', 250, 'vampiro.MP3', 'Vampiro', 'Matuê, Teto, Wiu'),
('Fim de Semana no Rio', 'https://i.imgur.com/T9wlD9Q.jpg', 199, 'fdsnorio.MP3', 'Fim de Semana no Rio', 'Teto'),
('Royal Salute', 'https://i.imgur.com/mALO0tw.jpg', 157, 'royalsalute.MP3', 'Royal Salute', 'Teto, DJ Matt-d, Menor MC'),
('Balazul', 'https://i.imgur.com/IRj27nh.jpg', 202, 'balazul.MP3', 'Balazul', 'Teto, Mateca'),
('M4', 'https://i.imgur.com/ROrYIgZ.jpg', 170, 'm4.MP3', 'M4', 'Teto'),
('Manha', 'https://i.imgur.com/CiZXVmH.jpg', 177, 'manha.MP3', 'Prévias.zip', 'Teto'),
('Paypal', 'https://i.imgur.com/CiZXVmH.jpg', 166, 'paypal.MP3', 'Prévias.zip', 'Teto'),
('Mustang Preto', 'https://i.imgur.com/p0z2D8K.jpg', 234, 'mustang.MP3', 'Mustang Preto', 'Teto'),
('Savana', 'https://i.imgur.com/MjuYYFW.jpg', 166, 'savana.MP3', 'Savana', 'Teto'),
('Minha Vida é um Filme', 'https://i.imgur.com/T9wlD9Q.jpg', 186, 'umfilme.MP3', 'Fim de Semana no Rio', 'Teto'),
('Problemas de um Milionário', 'https://i.imgur.com/S6MiLJU.jpg', 155, 'problemas.MP3', 'Problemas de um Milionário', 'Teto'),
('Pick Up The Phone', 'https://i.imgur.com/pL526Uz.png', 236, 'pick_up_the_phone.MP3', 'Birds in the Trap Sing McKnight', 'Travis Scott, Young Thug'),
('Goosebumps', 'https://i.imgur.com/pL526Uz.png', 243, 'goosebumps.MP3', 'Birds in the Trap Sing McKnight', 'Travis Scott, Kendrick Lamar'),
('Fe!n', 'https://i.imgur.com/dKPoLRI.png', 193, 'fein.MP3', 'Utopia', 'Travis Scott, Playboi Carti'),
('Butterfly Effect', 'https://i.imgur.com/APexNOc.jpg', 186, 'butterfly_effect.MP3', 'Astroworld', 'Travis Scott'),
('Stargazing', 'https://i.imgur.com/APexNOc.jpg', 272, 'stargazing.MP3', 'Astroworld', 'Travis Scott'),
('Sicko Mode', 'https://i.imgur.com/APexNOc.jpg', 314, 'sicko_mode.MP3', 'Astroworld', 'Travis Scott, Drake'),
('Antidote', 'https://i.imgur.com/OKwZAsH.jpg', 262, 'antidote.MP3', 'Rodeo', 'Travis Scott'),
('Nightcrawler', 'https://i.imgur.com/OKwZAsH.jpg', 322, 'nightcrawler.MP3', 'Rodeo', 'Travis Scott, Swae Lee, Chief Keef'),
('Highest in the Room', 'https://i.imgur.com/0U7qXEY.png', 175, 'highest_in_the_room.MP3', 'Highest in the Room', 'Travis Scott'),
('Out West', 'https://i.imgur.com/uQlsBk5.jpg', 159, 'out_west.MP3', 'JackBoys', 'Travis Scott, JACKBOYS'),
('The Scotts', 'https://i.imgur.com/5IvOHN9.jpg', 167, 'the_scotts.MP3', 'The Scotts', 'Travis Scott, Kid Cudi'),
('Trance', 'https://i.imgur.com/brEzLqq.jpg', 194, 'trance.MP3', 'Heroes & Villains', 'Metro Boomin, Travis Scott, Young Thug'),
('Superhero', 'https://i.imgur.com/brEzLqq.jpg', 182, 'superhero.MP3', 'Heroes & Villains', 'Metro Boomin, Chris Brown, Future'),
('Too Many Nights', 'https://i.imgur.com/brEzLqq.jpg', 199, 'too_many_nights.MP3', 'Heroes & Villains', 'Metro Boomin, Don Toliver, Future'),
('Creepin', 'https://i.imgur.com/brEzLqq.jpg', 221, 'creepin.MP3', 'Heroes & Villains', 'Metro Boomin, 21 Savage, The Weeknd'),
('Niagara Falls', 'https://i.imgur.com/brEzLqq.jpg', 207, 'niagara_falls.MP3', 'Heroes & Villains', 'Metro Boomin, 21 Savage, Travis Scott'),
('Type Shit', 'https://i.imgur.com/hUNeG0C.jpg', 229, 'type_shit.MP3', 'We Dont Trust You', 'Future, Metro Boomin, Travis Scott, Playboi Carti'),
('Like That', 'https://i.imgur.com/hUNeG0C.jpg', 267, 'like_that.MP3', 'We Dont Trust You', 'Future, Metro Boomin, Kendrick Lamar'),
('Glock in My Lap', 'https://i.imgur.com/crpea4N.jpg', 193, 'glock_in_my_lap.MP3', 'Savage Mode II', '21 Savage, Metro Boomin'),
('Ghostface Killers', 'https://i.imgur.com/ZHhbK94.jpg', 269, 'ghostface_killers.MP3', 'Without Warning', '21 Savage, Offset, Metro Boomin'),
('Ric Flair Drip', 'https://i.imgur.com/ZHhbK94.jpg', 172, 'ric_flair_drip.MP3', 'Without Warning', '21 Savage, Offset, Metro Boomin'),
('Heartless', 'https://i.imgur.com/fA5UF6r.png', 212, 'heartless.mp3', '808s & Heartbreak', 'Kanye West'),
('All Falls Down', 'https://i.imgur.com/kCqpDEi.jpg', 224, 'all_falls_down.mp3', 'The College Dropout', 'Kanye West'),
('Bound 2', 'https://i.imgur.com/PmECvec.jpg', 230, 'bound2.mp3', 'Yeezus', 'Kanye West'),
('Flashing Lights', 'https://i.imgur.com/BSROkHD.jpg', 238, 'flashing_lights.mp3', 'Graduation', 'Kanye West'),
('Homecoming', 'https://i.imgur.com/BSROkHD.jpg', 207, 'homecoming.mp3', 'Graduation', 'Kanye West, Chris Martin'),
('Cant Tell Me Nothing', 'https://i.imgur.com/BSROkHD.jpg', 272, 'cant_tell_me_nothing.mp3', 'Graduation', 'Kanye West'),
('I Wonder', 'https://i.imgur.com/BSROkHD.jpg', 244, 'i_wonder.mp3', 'Graduation', 'Kanye West'),
('All Mine', 'https://i.imgur.com/LVpnpgp.png', 146, 'all_mine.mp3', 'Ye', 'Kanye West'),
('Father Stretch My Hands Pt. 1', 'https://i.imgur.com/K7evEVK.png', 136, 'father.mp3', 'The Life of Pablo', 'Kanye West, Kid Cudi'),
('Famous', 'https://i.imgur.com/K7evEVK.png', 197, 'famous.mp3', 'The Life of Pablo', 'Kanye West, Rihanna'),
('Breathe', 'https://i.imgur.com/5PhRWZC.jpg', 171, 'breathe.mp3', '2093', 'Yeat'),
('If We Being Real', 'https://i.imgur.com/5PhRWZC.jpg', 173, 'if_we_being_real.mp3', '2093', 'Yeat'),
('Poppin', 'https://i.imgur.com/eFQWUvm.jpg', 168, 'poppin.mp3', '2 Alive', 'Yeat'),
('On Tha Line', 'https://i.imgur.com/eFQWUvm.jpg', 155, 'on_tha_line.mp3', '2 Alive', 'Yeat'),
('Money So Big', 'https://i.imgur.com/1vd9nxk.jpg', 161, 'money_so_big.mp3', 'Up 2 Me', 'Yeat'),
('Deserve It', 'https://i.imgur.com/1vd9nxk.jpg', 111, 'deserve_it.mp3', 'Up 2 Me', 'Yeat'),
('Get Busy', 'https://i.imgur.com/1vd9nxk.jpg', 158, 'get_busy.mp3', 'Up 2 Me', 'Yeat'),
('Out The Way', 'https://i.imgur.com/PEDtL33.jpg', 158, 'out_the_way.mp3', 'Lyfe', 'Yeat'),
('Flawless', 'https://i.imgur.com/PEDtL33.jpg', 158, 'flawless.mp3', 'Lyfe', 'Yeat, Lil Uzi Vert'),
('Sorry Bout That', 'https://i.imgur.com/riCJyP9.jpg', 187, 'sorry_bout_that.mp3', '4L', 'Yeat');