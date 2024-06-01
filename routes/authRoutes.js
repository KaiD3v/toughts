const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.get("/login", AuthController.login);
router.post("/register", AuthController.registerPost);
router.get("/register", AuthController.register);

module.exports = router;
