const { Router } = require("express");
const router = Router();
const { movieController } = require("../controllers/movie.controller");
// миддл вейр
// const { authMiddleware } = require("../utils/authChek.middleware");

router.post("/movie", movieController.addMovie);
router.patch("/movie:id", movieController.editMovie);
router.delete("/movie:id", movieController.deleteMovie);
router.get("/movie", movieController.getMovies);
router.get("/movie:id", movieController.getMovieById);

module.exports = router;
