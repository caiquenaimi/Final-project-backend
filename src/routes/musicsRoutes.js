const express = require("express");
const router = express.Router();
const musicsController = require("../controllers/musicsController");

router.get("/musics", musicsController.getAllMusics);
router.get("/musics/:name", musicsController.getMusicByName);
router.post("/musics", musicsController.createMusic);
router.put("/musics/:id", musicsController.updateMusic);
router.delete("/musics/:id", musicsController.deleteMusic);
router.post("/playlist/:playlistId/musics", musicsController.addMusicToPlaylist);
router.delete("/playlist/:playlistId/musics/:id", musicsController.removeMusicFromPlaylist);

module.exports = router;
