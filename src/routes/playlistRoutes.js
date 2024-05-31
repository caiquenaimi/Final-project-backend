const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistController");

router.get("/playlist", playlistController.getAllPlaylists);
router.get("/playlist/:name", playlistController.getPlaylistByName);
router.post("/playlist", playlistController.createPlaylist);
router.put("/playlist/:id", playlistController.updatePlaylist);
router.delete("/playlist/:id", playlistController.deletePlaylist);
router.get("/playlist/:playlistId/details", playlistController.getPlaylistDetails);
router.post("/playlist/music", playlistController.addMusicToPlaylist);

module.exports = router;
