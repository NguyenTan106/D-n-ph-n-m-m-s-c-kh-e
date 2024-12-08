const express = require("express");
const router = express.Router();
const {
  getHomePage,
  getSample,
  createNewUser,
  register,
} = require("../controllers/homeController");

// declare route
let initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/samples", getSample);
  router.get("/register", register);
  router.post("/create-user", createNewUser);

  return app.use("/", router);
};

module.exports = initWebRoutes;
