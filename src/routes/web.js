const express = require("express");
const router = express.Router();
const {
  getHomePage,
  getSample,
  createNewUser,
} = require("../controllers/homeController");

// declare route
router.get("/", getHomePage);
router.get("/register", getSample);
router.post("/create-user", createNewUser);

module.exports = router;
