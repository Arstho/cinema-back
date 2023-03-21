const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: "USER",
  },
  subscription: {
    // подписка
    type: Boolean,
    default: false,
  },
  money: {
    // количество денег на счету
    type: Number,
    default: 0,
  },
  purchasedFilms: [
    // купленные фильмы
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Movie",
    },
  ],
});

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
