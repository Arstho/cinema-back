const Auth = require("../models/Auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const generateAccesToken = (id, username, role) => {
  const payload = {
    id,
    username,
    role,
  };
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

class authController {
  async registration(req, res) {
    try {
      const { username, password } = req.body;
      const candidate = await Auth.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: "пользователь с таким именем уже существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new Auth({
        username,
        password: hashPassword,
      });
      if (!username) {
        return res.status(400).json({ message: "Имя пользователя не может быть пустым" });
      }
      if (password.length >= 12 || password.length < 4) {
        return res.status(400).json({
          message: "Пароль не может быть меньше 4 или больше 12 символов",
        });
      }
      await user.save();
      const token = generateAccesToken(user._id, user.role, user.username);
      return res.json({ token });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: "registration error" });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await Auth.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `пользователь ${username} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Введен неверный пароль" });
      }
      const token = generateAccesToken(user._id, user.role, user.username);
      return res.json({ token });
    } catch (error) {
      return res.status(400).json({ message: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await Auth.find();
      res.json({ users });
    } catch (error) {}
  }
  async deleteUser(req, res) {
    try {
      const username = req.params;
      const user = await Auth.findOneAndDelete({ username: username.user });
      res.json(user);
    } catch (error) {
      res.json({ message: "Не удалось удалить" });
    }
  }
}

module.exports = new authController();
