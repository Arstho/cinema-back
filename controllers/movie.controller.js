const Movie = require("../models/Movie.model");

module.exports.movieController = {
  addMovie: async (req, res) => {
    try {
      const movie = await Movie.create({
        name: req.body.name, // имя
        description: req.body.description, // описание
        preview: req.body.preview, // ссылка на превью
        ref: req.body.ref, // ссылка на фильм
        country: req.body.country, // страна
        category: req.body.category, // категория
        genre: req.body.genre, // жанр
        director: req.body.director, // режиссер
        budget: req.body.budget, // бюджет
        duration: req.body.duration, // продолжительность фильма
        release: req.body.release, // дата релиза
        raiting: req.body.raiting, // рейтинг (от 0 до 10)
        sub: req.body.sub, // подписка
      });
      return res.json(movie);
    } catch (error) {
      console.log(error.massage);
      return res.status(400).json({ message: error.message });
    }
  },
  deleteMovie: async (req, res) => {
    try {
      const movie = Movie.findByIdAndDelete(req.params.id);
      return res.json(movie);
    } catch (error) {
      console.log(error.massage);
      return res.status(400).json({ message: error.message });
    }
  },
  editMovie: async (req, res) => {
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        preview: req.body.preview,
        ref: req.body.ref,
        country: req.body.country,
        category: req.body.category,
        genre: req.body.genre,
        director: req.body.director,
        budget: req.body.budget,
        duration: req.body.duration,
        release: req.body.release,
        // ⬆︎⬆︎⬆︎ в addMovie есть описание и перевод!
      });
      return res.json(movie);
    } catch (error) {
      console.log(error.massage);
      return res.status(400).json({ message: error.message });
    }
  },
  getMovies: async (req, res) => {
    try {
      const movies = await Movie.find();
      return res.json(movies);
    } catch (error) {
      console.log(error.massage);
      return res.status(400).json({ message: error.message });
    }
  },
  getMovieById: async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      return res.json(movie);
    } catch (error) {
      console.log(error.massage);
      return res.status(400).json({ message: error.message });
    }
  },
};
