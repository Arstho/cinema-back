const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  name: {
    // имя
    type: String,
    required: true,
  },
  description: {
    // описание фильма
    type: String,
    required: true,
  },
  preview: {
    // ссылка на превью (фото)
    type: String,
    required: true,
  },
  ref: {
    // ссылка на фильм
    type: String,
    required: true,
  },
  country: String, // страна производства
  category:
    // категория
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
    },
  genre: [
    // жанр фильма
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Genre",
    },
  ],
  director: String, // режиссер
  budget: String, // бюджет
  duration: String, // продолжительность
  release: {
    // дата релиза
    type: String,
  },
  raiting: Number, // рейтинг (от 0 до 10)
  sub: {
    type: String,
    default: "Бесплатно",
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
