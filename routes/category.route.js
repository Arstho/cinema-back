const { Router } = require("express");
const router = Router();
const { categoryController } = require("../controllers/category.controller");

router.post("/genre", categoryController.addCat);
router.patch("/genre:id", categoryController.editCat);
router.delete("/genre:id", categoryController.deleteCat);
router.get("/genre", categoryController.getCat);
router.get("/genre:id", categoryController.getCatById);

module.exports = router;
