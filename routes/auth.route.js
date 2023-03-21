const { Router } = require("express");
const router = Router();
const controller = require("../controllers/auth.controller");
const authMiddleware = require("../utils/authChek.middleware");

router.post("/registration", controller.registration);
router.post("/login", controller.login);
router.get("/users", controller.getUsers);
router.delete("/user:id", controller.deleteUser);

module.exports = router;
