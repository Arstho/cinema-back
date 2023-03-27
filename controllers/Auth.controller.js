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
const generateAccesSubToken = (id, username, role) => {
  const payload = {
    id,
    username,
    role,
  };
  return jwt.sign(payload, secret, { expiresIn: "30d" });
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
      const token = generateAccesToken(user._id, user.username, user.role);
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
      if (user.subscription) {
        const subToken = generateAccesSubToken(user._id, user.username, user.role);
        const token = generateAccesToken(user._id, user.username, user.role);
        return res.json({ token, subToken });
      }
      const token = generateAccesToken(user._id, user.username, user.role);
      return res.json({ token });
    } catch (error) {
      return res.status(400).json({ message: "Login error" });
    }
  }

  async editUser(req, res) {
    try {
      const user = await Auth.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        subscription: req.body.subscription,
        money: req.body.money,
        purchasedFilms: req.body.purchasedFilms,
      });
      const subToken = generateAccesToken(user._id, user.username, user.role);
      return res.json({ subToken });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await Auth.find();
      res.json({ users });
    } catch (error) {}
  }
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await Auth.findById(id);
      console.log(user);
      res.json({ user });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }
  }
  async deleteUser(req, res) {
    try {
      const userId = req.params;
      const user = await Auth.findOneAndDelete({ userId });
      res.json(user);
    } catch (error) {
      res.json({ message: error.message });
    }
  }
}

module.exports = new authController();
