import Music from "./Musics";
import { musicsMocked } from "./Musics";

export default class MusicsRepository {
  constructor() {
    this.musicsList = [];
    const musics = musicsMocked.map((music) => {
      return new Music(
        music.name,
        music.image,
        music.duration,
        music.file,
        music.album,
        music.artist
      );
    });
    this.musicsList.push(...musics);
  }

  getMusics() {
    return this.musicsList;
  }

  getMusicByName(name) {
    return this.musicsList.find((music) => music.name === name);
  }

  getMusicByArtist(artist) {
    return this.musicsList.filter((music) => music.artist === artist);
  }

  getMusicByAlbum(album) {
    return this.musicsList.filter((music) => music.album === album);
  }

  getMusicById(id) {
    return this.musicsList.find((music) => music.id === id);
  }

  addMusic(music) {
    this.musicsList.push(music);
  }

  updateMusic(id, name, image, duration, file, album, artist) {
    const music = this.getMusicById(id);

    if (music) {
      music.name = name;
      music.image = image;
      music.duration = duration;
      music.file = file;
      music.album = album;
      music.artist = artist;
    }

    return music;
  }

  deleteMusic(id) {
    const music = this.getMusicById(id);

    if (music) {
      this.musicsList = this.musicsList.filter((music) => music.id !== id);
    }
  }
}
