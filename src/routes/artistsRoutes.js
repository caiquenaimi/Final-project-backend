const express = require("express");
const router = express.Router();
const artistsController = require("../controllers/artistsController");

router.get("/artists", artistsController.getAllArtists);
router.get("/artists/:name", artistsController.getArtistByName);
router.post("/artists", artistsController.createArtist);
router.put("/artists/:id", artistsController.updateArtist);
router.delete("/artists/:id", artistsController.deleteArtist);

module.exports = router;
