const pool = require("../config/dbConfig");

async function addMusicToPlaylist(playlistId, musicId) {
  try {
    await pool.query(
      "INSERT INTO playlist_music (playlist_id, music_id) VALUES ($1, $2)",
      [playlistId, musicId]
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeMusicFromPlaylist(playlistId, id) {
  try {
    await pool.query(
      "DELETE FROM playlist_music WHERE playlist_id = $1 AND id = $2",
      [playlistId, id]
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { addMusicToPlaylist, removeMusicFromPlaylist };
