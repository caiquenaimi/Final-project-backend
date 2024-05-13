const express = require("express");
const router = express.Router();
const genresController = require("../controllers/genresController");

router.get("/genres", genresController.getAllGenres);
router.get("/genres/:name", genresController.getGenreByName);
router.post("/genres", genresController.createGenre);
router.put("/genres/:id", genresController.updateGenre);
router.delete("/genres/:id", genresController.deleteGenre);

module.exports = router;
