const { Router } = require("express");
const router = Router();
const { genreController } = require("../controllers/genre.controller");

router.post("/genre", genreController.addGenre);
router.patch("/genre:id", genreController.editGenre);
router.delete("/genre:id", genreController.deleteGenre);
router.get("/genre", genreController.getGenre);
router.get("/genre:id", genreController.getGenreById);

module.exports = router;
