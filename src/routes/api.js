const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
// declare route
const initApiRoutes = (app) => {
  // test api
  router.get("/test-api", apiController.testApi);
  router.post("/register", apiController.handleRegister);

  return app.use("/api/v1/", router);
};

module.exports = initApiRoutes;
