var express = require("express");
var router = express.Router();

var FirebaseController = require("../controllers/firebase.controller");
const {
  checkIfAuthenticated,
} = require("../middlewares/firebase-auth.middleware");

router.get("/roles", FirebaseController.getRoles);
router.post("/roles/:id", FirebaseController.addRoles);
router.post("/claims/:id", FirebaseController.addClaims);
router.post("/user", FirebaseController.createUser);
// router.delete("/:id", FirebaseController.deleteMeal);
// router.put("/:id", FirebaseController.updateMeal);

module.exports = router;
