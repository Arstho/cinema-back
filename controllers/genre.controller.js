const Genre = require("../models/Genre.model");

module.exports.genreController = {
  addGenre: async (req, res) => {
    try {
      const genre = await Genre.create({
        name: req.body.name,
      });
      return res.json(genre);
    } catch (error) {
      console.log(error.massage);
      return res.status(400).json({ message: error.message });
    }
  },
  deleteGenre: async (req, res) => {
    try {
      const genre = Genre.findByIdAndDelete(req.params.id);
      return res.json(genre);
    } catch (error) {
      console.log(error.massage);
      return res.status(400).json({ message: error.message });
    }
  },
  editGenre: async (req, res) => {
    try {
      const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
      });
      return res.json(genre);
    } catch (error) {
      console.log(error.massage);
      return res.status(400).json({ message: error.message });
    }
  },
  getGenre: async (req, res) => {
    try {
      const genre = await Genre.find();
      return res.json(genre);
    } catch (error) {
      console.log(error.massage);
      return res.status(400).json({ message: error.message });
    }
  },
  getGenreById: async (req, res) => {
    try {
      const genre = await Genre.findById(req.params.id);
      return res.json(genre);
    } catch (error) {
      console.log(error.massage);
      return res.status(400).json({ message: error.message });
    }
  },
};
