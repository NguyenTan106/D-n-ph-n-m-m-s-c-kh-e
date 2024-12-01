const express = require("express");
const { getAllFoods } = require("../controllers/foodController");
const router = express.Router();

router.get("/", getAllFoods);

module.exports = router;
