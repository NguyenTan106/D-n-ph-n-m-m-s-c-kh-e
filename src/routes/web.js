const express = require("express");
const router = express.Router();
const { getHomePage, register } = require("../controllers/homeController.js");

// declare route
let initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/register", register);
  // router.get("/samples", getSample);
  // router.post("/create-user", createNewUser);

  return app.use("/", router);
};

module.exports = initWebRoutes;
