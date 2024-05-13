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

module.exports = addMusicToPlaylist;