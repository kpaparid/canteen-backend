var express = require("express");
var router = express.Router();

var MealController = require("../controllers/meal.controller");
const {
  checkIfAuthenticated,
} = require("../middlewares/firebase-auth.middleware");

router.get("/", MealController.getMeals);
router.post("/", checkIfAuthenticated, MealController.createMeal);
router.delete("/:id", checkIfAuthenticated, MealController.deleteMeal);
router.put("/:id", checkIfAuthenticated, MealController.updateMeal);
router.put("/all/:id", checkIfAuthenticated, MealController.updateAllMeals);

module.exports = router;
