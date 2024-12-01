const express = require("express");
const router = express.Router();
const { getHomePage, getSample } = require("../controllers/homeController");

// declare route
router.get("/", getHomePage);

router.get("/samples", getSample);

module.exports = router;
