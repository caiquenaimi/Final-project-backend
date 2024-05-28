const { v4: uuidv4 } = require("uuid");

class Music {
  constructor(name, image, duration, file, album, artist) {
    this.name = name;
    this.image = image;
    this.duration = duration;
    this.file = file;
    this.album = album;
    this.artist = artist;
    this.id = uuidv4();
  }
}

module.exports = Music;
