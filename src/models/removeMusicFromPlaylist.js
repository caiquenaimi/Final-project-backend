const pool = require("../config/dbConfig");

async function removeMusicFromPlaylist(playlistId, musicId) {
    try {
        await musicModel.removeMusicFromPlaylist(playlistId, musicId);
        res.status(204).send();
    } catch (error) {
        console.error("Error removing music from playlist:", error);
        res.status(500).json({ error: error.message });
    }
}